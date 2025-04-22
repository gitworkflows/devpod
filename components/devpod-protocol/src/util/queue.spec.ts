/**
 * Copyright (c) 2020 Devpod GmbH.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { suite, test, slow, timeout } from "@testdeck/mocha";
import * as chai from "chai";import { Queue } from "..";
import { fail } from "assert";
import { Deferred } from "./deferred";

// Safe chai subset import
const chaiSubset = require("chai-subset");chai.use(chaiSubset);

const expect = chai.expect;

@suite
class QueueSpec {
    private queue!: Queue;
    private seq: number[] = [];

    before(): void {
        this.queue = new Queue();
        this.seq = [];
    }

    private async exec(seqNr: number, nextTick = false, sleep = 0): Promise<void> {
        await this.queue.enqueue(async () => {
            const push = async (): Promise<void> => {
                if (sleep > 0) {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            this.seq.push(seqNr);
                            resolve();
                        }, sleep);
                    });
                } else {
                    this.seq.push(seqNr);
                }
            };

            if (nextTick) {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        void push().then(resolve);
                    });
                });
            } else {
                await push();
            }
        });
    }

    private execError(seqNr: number): Deferred<boolean> {
        const deferred = new Deferred<boolean>();
        void this.queue.enqueue(async () => {
            this.seq.push(seqNr);
            throw new Error("test error");
        }).then(() => {
            deferred.reject(false);
        }).catch(() => {
            deferred.resolve(true);
        });

        return deferred;
    }

    private expectArray<T>(actual: T[], expected: T[]): void {
        expect(actual).to.have.lengthOf(expected.length);
        const expIt = expected.entries();
        for (const act of actual) {
            const entry = expIt.next();
            if (!entry.done) {
                const [, exp] = entry.value;
                expect(act).to.deep.equal(exp);
            }
        }
    }

    @test public async isExecutedInOrder(): Promise<void> {
        await this.exec(1);
        await this.exec(2);
        this.expectArray(this.seq, [1, 2]);
    }

    @test public async isExecutedInOrderSkipTick(): Promise<void> {
        await this.exec(1, true);
        await this.exec(2);
        this.expectArray(this.seq, [1, 2]);
    }

    @test @timeout(3000) @slow(3000)
    public async isExecutedInOrderSleep(): Promise<void> {
        await this.exec(1, false, 2000);
        await this.exec(2);
        this.expectArray(this.seq, [1, 2]);
    }

    @test public async continueDespiteError(): Promise<void> {
        await this.exec(1);
        const receivedError = this.execError(2);
        await this.exec(3);

        expect(receivedError.isResolved).to.equal(true);
        expect(await receivedError.promise).to.equal(true);
        this.expectArray(this.seq, [1, 2, 3]);
    }

    @test public async mustCatchError(): Promise<void> {
        const f = async (): Promise<void> => {
            throw new Error();
        };

        try {
            const p = this.queue.enqueue(async () => f());
            p.catch(() => {
                // Silence unhandled promise rejection messages
            });
        } catch (err) {
            fail("We expect to catch no error");
        }
    }

    @test public async expectUncaughtError(): Promise<void> {
        const f = async (): Promise<void> => {
            throw new Error();
        };
        const p = this.queue.enqueue(async () => f());
        p.then(() => {
            fail("Expected to catch error!");
        }).catch(() => {
            // Silence unhandled promise rejection messages
        });
    }
}

export = new QueueSpec();

/**
 * Copyright (c) 2025 Devpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// @generated by protoc-gen-es v1.3.3 with parameter "target=ts"
// @generated from file devpod/v1/scm.proto (package devpod.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { PaginationRequest, PaginationResponse } from "./pagination_pb.js";

/**
 * @generated from message devpod.v1.SearchSCMTokensRequest
 */
export class SearchSCMTokensRequest extends Message<SearchSCMTokensRequest> {
  /**
   * @generated from field: string host = 1;
   */
  host = "";

  constructor(data?: PartialMessage<SearchSCMTokensRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.SearchSCMTokensRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchSCMTokensRequest {
    return new SearchSCMTokensRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchSCMTokensRequest {
    return new SearchSCMTokensRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchSCMTokensRequest {
    return new SearchSCMTokensRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SearchSCMTokensRequest | PlainMessage<SearchSCMTokensRequest> | undefined, b: SearchSCMTokensRequest | PlainMessage<SearchSCMTokensRequest> | undefined): boolean {
    return proto3.util.equals(SearchSCMTokensRequest, a, b);
  }
}

/**
 * @generated from message devpod.v1.SearchSCMTokensResponse
 */
export class SearchSCMTokensResponse extends Message<SearchSCMTokensResponse> {
  /**
   * @generated from field: repeated devpod.v1.SCMToken tokens = 1;
   */
  tokens: SCMToken[] = [];

  constructor(data?: PartialMessage<SearchSCMTokensResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.SearchSCMTokensResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "tokens", kind: "message", T: SCMToken, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchSCMTokensResponse {
    return new SearchSCMTokensResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchSCMTokensResponse {
    return new SearchSCMTokensResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchSCMTokensResponse {
    return new SearchSCMTokensResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SearchSCMTokensResponse | PlainMessage<SearchSCMTokensResponse> | undefined, b: SearchSCMTokensResponse | PlainMessage<SearchSCMTokensResponse> | undefined): boolean {
    return proto3.util.equals(SearchSCMTokensResponse, a, b);
  }
}

/**
 * @generated from message devpod.v1.GuessTokenScopesRequest
 */
export class GuessTokenScopesRequest extends Message<GuessTokenScopesRequest> {
  /**
   * @generated from field: string host = 1;
   */
  host = "";

  /**
   * @generated from field: string repo_url = 2;
   */
  repoUrl = "";

  /**
   * @generated from field: string git_command = 3;
   */
  gitCommand = "";

  constructor(data?: PartialMessage<GuessTokenScopesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.GuessTokenScopesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repo_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "git_command", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GuessTokenScopesRequest {
    return new GuessTokenScopesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GuessTokenScopesRequest {
    return new GuessTokenScopesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GuessTokenScopesRequest {
    return new GuessTokenScopesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GuessTokenScopesRequest | PlainMessage<GuessTokenScopesRequest> | undefined, b: GuessTokenScopesRequest | PlainMessage<GuessTokenScopesRequest> | undefined): boolean {
    return proto3.util.equals(GuessTokenScopesRequest, a, b);
  }
}

/**
 * @generated from message devpod.v1.GuessTokenScopesResponse
 */
export class GuessTokenScopesResponse extends Message<GuessTokenScopesResponse> {
  /**
   * @generated from field: repeated string scopes = 1;
   */
  scopes: string[] = [];

  /**
   * @generated from field: string message = 2;
   */
  message = "";

  constructor(data?: PartialMessage<GuessTokenScopesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.GuessTokenScopesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "scopes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GuessTokenScopesResponse {
    return new GuessTokenScopesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GuessTokenScopesResponse {
    return new GuessTokenScopesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GuessTokenScopesResponse {
    return new GuessTokenScopesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GuessTokenScopesResponse | PlainMessage<GuessTokenScopesResponse> | undefined, b: GuessTokenScopesResponse | PlainMessage<GuessTokenScopesResponse> | undefined): boolean {
    return proto3.util.equals(GuessTokenScopesResponse, a, b);
  }
}

/**
 * @generated from message devpod.v1.SearchRepositoriesRequest
 */
export class SearchRepositoriesRequest extends Message<SearchRepositoriesRequest> {
  /**
   * @generated from field: string search_string = 1;
   */
  searchString = "";

  /**
   * @generated from field: int32 limit = 2;
   */
  limit = 0;

  constructor(data?: PartialMessage<SearchRepositoriesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.SearchRepositoriesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "search_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchRepositoriesRequest {
    return new SearchRepositoriesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchRepositoriesRequest {
    return new SearchRepositoriesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchRepositoriesRequest {
    return new SearchRepositoriesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SearchRepositoriesRequest | PlainMessage<SearchRepositoriesRequest> | undefined, b: SearchRepositoriesRequest | PlainMessage<SearchRepositoriesRequest> | undefined): boolean {
    return proto3.util.equals(SearchRepositoriesRequest, a, b);
  }
}

/**
 * @generated from message devpod.v1.SearchRepositoriesResponse
 */
export class SearchRepositoriesResponse extends Message<SearchRepositoriesResponse> {
  /**
   * @generated from field: repeated devpod.v1.SuggestedRepository repositories = 1;
   */
  repositories: SuggestedRepository[] = [];

  constructor(data?: PartialMessage<SearchRepositoriesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.SearchRepositoriesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repositories", kind: "message", T: SuggestedRepository, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchRepositoriesResponse {
    return new SearchRepositoriesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchRepositoriesResponse {
    return new SearchRepositoriesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchRepositoriesResponse {
    return new SearchRepositoriesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SearchRepositoriesResponse | PlainMessage<SearchRepositoriesResponse> | undefined, b: SearchRepositoriesResponse | PlainMessage<SearchRepositoriesResponse> | undefined): boolean {
    return proto3.util.equals(SearchRepositoriesResponse, a, b);
  }
}

/**
 * @generated from message devpod.v1.ListSuggestedRepositoriesRequest
 */
export class ListSuggestedRepositoriesRequest extends Message<ListSuggestedRepositoriesRequest> {
  /**
   * @generated from field: devpod.v1.PaginationRequest pagination = 1;
   */
  pagination?: PaginationRequest;

  /**
   * @generated from field: string organization_id = 2;
   */
  organizationId = "";

  /**
   * @generated from field: bool exclude_configurations = 3;
   */
  excludeConfigurations = false;

  constructor(data?: PartialMessage<ListSuggestedRepositoriesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.ListSuggestedRepositoriesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pagination", kind: "message", T: PaginationRequest },
    { no: 2, name: "organization_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "exclude_configurations", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSuggestedRepositoriesRequest {
    return new ListSuggestedRepositoriesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSuggestedRepositoriesRequest {
    return new ListSuggestedRepositoriesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSuggestedRepositoriesRequest {
    return new ListSuggestedRepositoriesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListSuggestedRepositoriesRequest | PlainMessage<ListSuggestedRepositoriesRequest> | undefined, b: ListSuggestedRepositoriesRequest | PlainMessage<ListSuggestedRepositoriesRequest> | undefined): boolean {
    return proto3.util.equals(ListSuggestedRepositoriesRequest, a, b);
  }
}

/**
 * @generated from message devpod.v1.ListSuggestedRepositoriesResponse
 */
export class ListSuggestedRepositoriesResponse extends Message<ListSuggestedRepositoriesResponse> {
  /**
   * @generated from field: devpod.v1.PaginationResponse pagination = 1;
   */
  pagination?: PaginationResponse;

  /**
   * @generated from field: repeated devpod.v1.SuggestedRepository repositories = 2;
   */
  repositories: SuggestedRepository[] = [];

  constructor(data?: PartialMessage<ListSuggestedRepositoriesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.ListSuggestedRepositoriesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pagination", kind: "message", T: PaginationResponse },
    { no: 2, name: "repositories", kind: "message", T: SuggestedRepository, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSuggestedRepositoriesResponse {
    return new ListSuggestedRepositoriesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSuggestedRepositoriesResponse {
    return new ListSuggestedRepositoriesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSuggestedRepositoriesResponse {
    return new ListSuggestedRepositoriesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListSuggestedRepositoriesResponse | PlainMessage<ListSuggestedRepositoriesResponse> | undefined, b: ListSuggestedRepositoriesResponse | PlainMessage<ListSuggestedRepositoriesResponse> | undefined): boolean {
    return proto3.util.equals(ListSuggestedRepositoriesResponse, a, b);
  }
}

/**
 * @generated from message devpod.v1.SCMToken
 */
export class SCMToken extends Message<SCMToken> {
  /**
   * @generated from field: string username = 1;
   */
  username = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  /**
   * @generated from field: string id_token = 3;
   */
  idToken = "";

  /**
   * @generated from field: string refresh_token = 4;
   */
  refreshToken = "";

  /**
   * @generated from field: repeated string scopes = 5;
   */
  scopes: string[] = [];

  /**
   * @generated from field: google.protobuf.Timestamp update_date = 6;
   */
  updateDate?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp expiry_date = 7;
   */
  expiryDate?: Timestamp;

  constructor(data?: PartialMessage<SCMToken>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.SCMToken";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "id_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "refresh_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "scopes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "update_date", kind: "message", T: Timestamp },
    { no: 7, name: "expiry_date", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SCMToken {
    return new SCMToken().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SCMToken {
    return new SCMToken().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SCMToken {
    return new SCMToken().fromJsonString(jsonString, options);
  }

  static equals(a: SCMToken | PlainMessage<SCMToken> | undefined, b: SCMToken | PlainMessage<SCMToken> | undefined): boolean {
    return proto3.util.equals(SCMToken, a, b);
  }
}

/**
 * @generated from message devpod.v1.SuggestedRepository
 */
export class SuggestedRepository extends Message<SuggestedRepository> {
  /**
   * @generated from field: string url = 1;
   */
  url = "";

  /**
   * @generated from field: string repo_name = 2;
   */
  repoName = "";

  /**
   * @generated from field: string configuration_id = 3;
   */
  configurationId = "";

  /**
   * @generated from field: string configuration_name = 4;
   */
  configurationName = "";

  constructor(data?: PartialMessage<SuggestedRepository>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.SuggestedRepository";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repo_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "configuration_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "configuration_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SuggestedRepository {
    return new SuggestedRepository().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SuggestedRepository {
    return new SuggestedRepository().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SuggestedRepository {
    return new SuggestedRepository().fromJsonString(jsonString, options);
  }

  static equals(a: SuggestedRepository | PlainMessage<SuggestedRepository> | undefined, b: SuggestedRepository | PlainMessage<SuggestedRepository> | undefined): boolean {
    return proto3.util.equals(SuggestedRepository, a, b);
  }
}

/**
 * @generated from message devpod.v1.Author
 */
export class Author extends Message<Author> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string avatar_url = 2;
   */
  avatarUrl = "";

  constructor(data?: PartialMessage<Author>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.Author";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "avatar_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Author {
    return new Author().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Author {
    return new Author().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Author {
    return new Author().fromJsonString(jsonString, options);
  }

  static equals(a: Author | PlainMessage<Author> | undefined, b: Author | PlainMessage<Author> | undefined): boolean {
    return proto3.util.equals(Author, a, b);
  }
}

/**
 * @generated from message devpod.v1.Commit
 */
export class Commit extends Message<Commit> {
  /**
   * @generated from field: string message = 1;
   */
  message = "";

  /**
   * @generated from field: devpod.v1.Author author = 2;
   */
  author?: Author;

  /**
   * @generated from field: google.protobuf.Timestamp author_date = 3;
   */
  authorDate?: Timestamp;

  /**
   * @generated from field: string sha = 4;
   */
  sha = "";

  constructor(data?: PartialMessage<Commit>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "devpod.v1.Commit";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "author", kind: "message", T: Author },
    { no: 3, name: "author_date", kind: "message", T: Timestamp },
    { no: 4, name: "sha", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Commit {
    return new Commit().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Commit {
    return new Commit().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Commit {
    return new Commit().fromJsonString(jsonString, options);
  }

  static equals(a: Commit | PlainMessage<Commit> | undefined, b: Commit | PlainMessage<Commit> | undefined): boolean {
    return proto3.util.equals(Commit, a, b);
  }
}

// Copyright (c) 2022 Devpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License.AGPL.txt in the project root for license information.

package dbtest

import (
	"testing"
	"time"

	"github.com/google/uuid"
	db "github.com/khulnasoft/devpod/components/devpod-db/go"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
)

func NewCostCenter(t *testing.T, record db.CostCenter) db.CostCenter {
	t.Helper()

	result := db.CostCenter{
		ID:                db.NewTeamAttributionID(uuid.New().String()),
		CreationTime:      db.NewVarCharTime(time.Now()),
		SpendingLimit:     100,
		BillingStrategy:   db.CostCenter_Stripe,
		BillingCycleStart: db.NewVarCharTime(time.Now()),
		NextBillingTime:   db.NewVarCharTime(time.Now().Add(10 * time.Hour)),
	}

	if record.ID != "" {
		result.ID = record.ID
	}
	if record.CreationTime.IsSet() {
		result.CreationTime = record.CreationTime
	}
	if record.SpendingLimit != 0 {
		result.SpendingLimit = record.SpendingLimit
	}
	if record.BillingStrategy != "" {
		result.BillingStrategy = record.BillingStrategy
	}

	result.BillingCycleStart = record.BillingCycleStart
	result.NextBillingTime = record.NextBillingTime

	return result
}

func CreateCostCenters(t *testing.T, conn *gorm.DB, entries ...db.CostCenter) []db.CostCenter {
	t.Helper()

	var records []db.CostCenter
	var ids []string
	for _, entry := range entries {
		record := NewCostCenter(t, entry)
		records = append(records, record)
		ids = append(ids, string(record.ID))
	}

	tx := conn.CreateInBatches(records, 100)
	require.NoError(t, tx.Error)
	t.Cleanup(func() {
		if len(ids) > 0 {
			require.NoError(t, conn.Where(ids).Delete(&db.CostCenter{}).Error)
		}
	})

	return records
}

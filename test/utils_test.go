package utils

import (
	utils "dcard-homework/utils"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCompareTime(t *testing.T) {
	assert.True(t, utils.IsLessThanAnHour(time.Now().Unix()-3599))
	assert.False(t, utils.IsLessThanAnHour(time.Now().Unix()-3600))
}

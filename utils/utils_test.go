package utils

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCompareTime(t *testing.T) {
	assert.True(t, isLessThanAnHour(time.Now().Unix()+3599))
	assert.False(t, isLessThanAnHour(time.Now().Unix()+3600))
}

package utils

import (
	"time"
)

// IsLessThanAnHour : compare time
func IsLessThanAnHour(targetTime int64) bool {
	nowTime := time.Now().Unix()
	if nowTime-targetTime < 3600 {
		return true
	}
	return false
}

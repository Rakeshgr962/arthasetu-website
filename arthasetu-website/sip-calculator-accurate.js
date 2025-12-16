/**
 * ACCURATE SIP CALCULATION
 * 
 * Correct Formula for SIP (Systematic Investment Plan)
 * 
 * FORWARD (SIP to Future Value):
 * FV = P × [((1 + r)^n - 1) / r] × (1 + r)
 * 
 * Where:
 * FV = Future Value
 * P = Monthly SIP amount
 * r = Monthly interest rate (annual rate / 12 / 100)
 * n = Number of months
 * (1 + r) multiplier at end = accounts for beginning-of-period payments
 * 
 * REVERSE (Goal to Required SIP):
 * P = FV / [((1 + r)^n - 1) / r] × (1 + r)
 * 
 * Example Verification:
 * SIP = ₹10,000/month
 * Years = 20 (240 months)
 * Annual Rate = 12% (Monthly = 1% = 0.01)
 * 
 * Step 1: Calculate monthly rate
 * r = 12 / 12 / 100 = 0.01
 * 
 * Step 2: Calculate exponent
 * (1 + 0.01)^240 = 1.01^240 = 10.8965
 * 
 * Step 3: Calculate numerator
 * ((1 + 0.01)^240 - 1) = (10.8965 - 1) = 9.8965
 * 
 * Step 4: Divide by monthly rate
 * 9.8965 / 0.01 = 989.65
 * 
 * Step 5: Multiply by (1 + r) for beginning of period
 * 989.65 × 1.01 = 999.35
 * 
 * Step 6: Multiply by SIP amount
 * FV = 10,000 × 999.35 = 99,93,500 (approximately ₹1 Crore)
 */

class SIPCalculator {
    /**
     * Calculate future value of SIP (Forward Calculation)
     * @param {number} monthlyAmount - Monthly SIP amount in rupees
     * @param {number} years - Investment period in years
     * @param {number} annualRate - Expected annual return percentage (e.g., 12 for 12%)
     * @returns {object} { futureValue, principal, gains, gainPercent }
     */
    static calculateForwardSIP(monthlyAmount, years, annualRate) {
        // Convert annual rate to monthly rate (as decimal)
        const monthlyRate = annualRate / 12 / 100;
        
        // Total number of months
        const months = years * 12;
        
        // Total principal invested
        const principal = monthlyAmount * months;
        
        // FV Formula: P × [((1 + r)^n - 1) / r] × (1 + r)
        // This assumes investment at beginning of each period
        const numerator = Math.pow(1 + monthlyRate, months) - 1;
        const futureValue = monthlyAmount * (numerator / monthlyRate) * (1 + monthlyRate);
        
        // Calculate gains
        const gains = futureValue - principal;
        const gainPercent = (gains / futureValue) * 100;
        
        return {
            futureValue: Math.round(futureValue),
            principal: Math.round(principal),
            gains: Math.round(gains),
            gainPercent: gainPercent.toFixed(1),
            monthlyRate: monthlyRate,
            months: months
        };
    }

    /**
     * Calculate required SIP amount for a goal (Reverse Calculation)
     * @param {number} goalAmount - Target wealth amount in rupees
     * @param {number} years - Time available in years
     * @param {number} annualRate - Expected annual return percentage
     * @returns {object} { monthlySIP, totalInvested, totalGains, gainPercent }
     */
    static calculateReverseSIP(goalAmount, years, annualRate) {
        // Convert annual rate to monthly rate (as decimal)
        const monthlyRate = annualRate / 12 / 100;
        
        // Total number of months
        const months = years * 12;
        
        // Reverse FV Formula: P = FV / [((1 + r)^n - 1) / r] × (1 + r)
        const numerator = Math.pow(1 + monthlyRate, months) - 1;
        const divisor = (numerator / monthlyRate) * (1 + monthlyRate);
        const monthlySIP = goalAmount / divisor;
        
        // Calculate total invested and gains
        const totalInvested = monthlySIP * months;
        const totalGains = goalAmount - totalInvested;
        const gainPercent = (totalGains / goalAmount) * 100;
        
        return {
            monthlySIP: Math.round(monthlySIP),
            totalInvested: Math.round(totalInvested),
            totalGains: Math.round(totalGains),
            gainPercent: gainPercent.toFixed(1),
            monthlyRate: monthlyRate,
            months: months
        };
    }

    /**
     * Verify calculation accuracy
     * Used for testing
     */
    static verifyCalculation(monthlyAmount, years, annualRate) {
        const forward = this.calculateForwardSIP(monthlyAmount, years, annualRate);
        
        // Verify: If we reach FV and invest in reverse, should get back monthly amount
        const reverse = this.calculateReverseSIP(forward.futureValue, years, annualRate);
        
        const match = Math.abs(reverse.monthlySIP - monthlyAmount) < 1; // Allow ₹1 variance
        
        return {
            forward,
            reverse,
            isAccurate: match,
            variance: Math.abs(reverse.monthlySIP - monthlyAmount)
        };
    }

    /**
     * Generate SIP projection table (month by month)
     */
    static generateProjectionTable(monthlyAmount, years, annualRate, interval = 12) {
        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;
        const table = [];
        
        for (let m = interval; m <= months; m += interval) {
            const numerator = Math.pow(1 + monthlyRate, m) - 1;
            const fv = monthlyAmount * (numerator / monthlyRate) * (1 + monthlyRate);
            const principal = monthlyAmount * m;
            const gains = fv - principal;
            
            table.push({
                month: m,
                year: (m / 12).toFixed(1),
                principal: Math.round(principal),
                gains: Math.round(gains),
                futureValue: Math.round(fv)
            });
        }
        
        return table;
    }
}

// Test and verify accuracy
console.log("=== SIP CALCULATION VERIFICATION ===\n");

// Test Case 1: ₹10,000/month for 20 years at 12%
const test1 = SIPCalculator.calculateForwardSIP(10000, 20, 12);
console.log("Test 1: ₹10,000/month × 20 years @ 12% p.a.");
console.log("Future Value:", test1.futureValue);
console.log("Principal:", test1.principal);
console.log("Gains:", test1.gains);
console.log("Gain %:", test1.gainPercent + "%\n");

// Test Case 2: Reverse - Goal of ₹1 Crore
const test2 = SIPCalculator.calculateReverseSIP(10000000, 20, 12);
console.log("Test 2: Goal ₹1,00,00,000 in 20 years @ 12% p.a.");
console.log("Required Monthly SIP:", test2.monthlySIP);
console.log("Total Invested:", test2.totalInvested);
console.log("Total Gains:", test2.totalGains);
console.log("Gain %:", test2.gainPercent + "%\n");

// Test Case 3: Verification
const test3 = SIPCalculator.verifyCalculation(10000, 20, 12);
console.log("Test 3: Verification Check");
console.log("Forward SIP Result:", test3.forward.futureValue);
console.log("Reverse SIP Needed:", test3.reverse.monthlySIP);
console.log("Match (should be close):", test3.isAccurate);
console.log("Variance:", test3.variance.toFixed(2) + " rupees\n");

// Generate projection table
console.log("=== PROJECTION TABLE (Yearly) ===");
const projection = SIPCalculator.generateProjectionTable(10000, 20, 12, 12);
projection.forEach(row => {
    console.log(`Year ${row.year}: Principal ₹${row.principal.toLocaleString()} | Gains ₹${row.gains.toLocaleString()} | Total ₹${row.futureValue.toLocaleString()}`);
});

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.SIPCalculator = SIPCalculator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SIPCalculator;
}
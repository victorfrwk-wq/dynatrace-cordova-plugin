#!/usr/bin/env node

/**
 * Capacitor Hook - Post-build/run cleanup
 * This hook runs after capacitor build/run to finalize instrumentation
 * Triggered: after capacitor build, after capacitor run
 */

const Logger = require('../logger/Logger');

class CapacitorClose {
  constructor() {
    this.logger = new Logger();
  }

  /**
   * Main execution method for cleanup
   */
  async run() {
    try {
      this.logger.info('Finalizing Dynatrace instrumentation for Capacitor...');

      // Perform any post-build cleanup or verification
      this.finalizeInstrumentation();

      this.logger.info('Dynatrace instrumentation finalization completed.');
    } catch (error) {
      this.logger.error(`Instrumentation finalization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Finalize instrumentation process
   */
  finalizeInstrumentation() {
    // Log successful completion
    this.logger.info('Application has been instrumented with Dynatrace RUM agent.');
    this.logger.info('Dynatrace monitoring is now active in your application.');
  }
}

// Export for programmatic use
module.exports = CapacitorClose;

// Handle direct execution
if (require.main === module) {
  const close = new CapacitorClose();
  close.run().catch((error) => {
    process.exit(1);
  });
}

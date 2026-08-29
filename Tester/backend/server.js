// Helper to stream incident logs directly into the AFTERMATH AI Agent
async function streamToAftermath(service, eventType, message, status, traceId, metadata = {}) {
  try {
    await fetch('http://localhost:4000/api/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        traceId,
        service,   // e.g., "PAYMENT SERVICE", "API GATEWAY", "ORDER SERVICE"
        eventType, // e.g., "CONFIG_CHANGE", "LATENCY_SPIKE", "RETRY_STORM", "ERROR"[cite: 1]
        message,
        status,    // "OK", "WARN", "CRITICAL"
        metadata
      })
    });
  } catch (err) {
    // Non-blocking fallback if aftermath server is offline
    console.log('[AFTERMATH-STREAM-OFFLINE]');
  }
}
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Global state for memory leaks & concurrency testing
let unclosedMemoryStore = [];
let globalStock = 1;

// Global Chaos Configuration
let chaosState = {
  // Standard Errors
  authExpired: false,
  rateLimitExceeded: false,
  schemaValidation: false,
  inventoryMismatch: false,
  thirdPartyOutage: false,
  dbPoolExhausted: false,
  paymentSlowdown: false,
  dbDeadlock: false,
  // Complex Architectural Errors
  silentCorruption: false,
  raceCondition: false,
  memoryLeak: false,
  cascadingFailure: false
};

// Admin route to toggle chaos scenarios dynamically
app.post('/api/admin/chaos', (req, res) => {
  chaosState = { ...chaosState, ...req.body };
  console.log('\n--- [CHAOS STATE UPDATED] ---');
  console.table(chaosState);
  res.status(200).json({ success: true, chaosState });
});

// Primary Checkout Order Endpoint
app.post('/api/v1/orders', (req, res) => {
  const traceId = `TRC-${Math.floor(100000 + Math.random() * 900000)}`;
  const { items, totalAmount, restaurant, paymentMethod } = req.body;

  console.log(`\n==================================================`);
  console.log(`[${new Date().toLocaleTimeString()}] [API-GATEWAY] [TRACE: ${traceId}] Incoming Order Request`);
  console.log(`[ORDER-SERVICE] [TRACE: ${traceId}] Service: ${restaurant?.name || 'Unknown'} | Payment: ${paymentMethod} | Total: ₹${totalAmount}`);

  // --- 1. COMPLEX ARCHITECTURAL ERROR HANDLERS ---

  // Silent Data Mutation / Corruption (200 OK with payload corruption)
  if (chaosState.silentCorruption) {
    const corruptedTotal = req.body.totalAmount + "0";
    console.warn(`[${traceId}] [DATA-MUTATION-WARN] Payload sanitization mutated totalAmount. Expected Number, coerced to String concatenation.`);
    return res.status(200).json({
      success: true,
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      message: "Order placed!",
      chargedAmount: corruptedTotal
    });
  }

  // Thread Lock / Race Condition Double-Allocation (409 Conflict)
  if (chaosState.raceCondition) {
    if (globalStock <= 0) {
      console.error(`[${traceId}] [CONCURRENCY-ERROR] Inventory depleted. Double-allocation detected for Item ID: 103 under concurrent thread lock failure.`);
      return res.status(409).json({ success: false, message: "Inventory conflict: Item claimed by another request." });
    }
    globalStock--;
  }

  // Memory Leak / Event Loop Delay
  if (chaosState.memoryLeak) {
    for (let i = 0; i < 100000; i++) {
      unclosedMemoryStore.push({ traceId, payload: req.body, timestamp: Date.now() });
    }
    console.error(`[${traceId}] [NODEJS-EVENTLOOP-CRITICAL] Heap allocation spiked by 45MB. Potential memory leak detected in unclosed session listener.`);
  }

  // Cascading Partial Failure across Microservices (207 Multi-Status)
  if (chaosState.cascadingFailure) {
    console.log(`[${traceId}] [ORDER-SERVICE] [200 OK] Order created successfully in DB.`);
    console.error(`[${traceId}] [NOTIFICATION-SERVICE] [500] Failed to emit Kafka message 'ORDER_PLACED'. Broker connection lost.`);
    console.error(`[${traceId}] [ANALYTICS-PIPELINE] [504] DB write backpressure timeout.`);
    return res.status(207).json({
      success: true,
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      warning: "Order placed, but downstream notifications and analytics failed."
    });
  }

  // --- 2. STANDARD HTTP / INFRASTRUCTURE ERRORS ---

  if (chaosState.authExpired) {
    console.error(`[${traceId}] [AUTH-SERVICE] [401 FATAL] JWT Verification Failed (ERR_EXPIRED_TOKEN).`);
    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
  }

  if (chaosState.rateLimitExceeded) {
    console.error(`[${traceId}] [RATE-LIMITER] [429] IP 127.0.0.1 exceeded rate limit of 10 req/sec.`);
    return res.status(429).json({ success: false, message: "Too many requests. Please slow down." });
  }

  if (chaosState.schemaValidation) {
    console.error(`[${traceId}] [VALIDATION-MIDDLEWARE] [400] ValidationError: Field 'totalAmount' failed schema checks.`);
    return res.status(400).json({ success: false, message: "Bad Request: Order payload format invalid." });
  }

  if (chaosState.inventoryMismatch) {
    console.error(`[${traceId}] [INVENTORY-SERVICE] [400] Item out of stock in real-time inventory DB.`);
    return res.status(400).json({ success: false, message: "Item unavailable in real-time inventory." });
  }

  if (chaosState.thirdPartyOutage) {
    console.error(`[${traceId}] [PAYMENT-SERVICE] [502] Upstream Gateway (Razorpay/Stripe) returned 503 Service Unavailable.`);
    return res.status(502).json({ success: false, message: "Payment Gateway Service is currently down." });
  }

  if (chaosState.dbPoolExhausted) {
    console.error(`[${traceId}] [DATABASE-SERVICE] [504] ConnectionPoolTimeoutError: Active connections (20/20) maxed out.`);
    return res.status(504).json({ success: false, message: "Database connection timed out." });
  }

  if (chaosState.paymentSlowdown) {
    console.error(`[${traceId}] [PAYMENT-SERVICE] [504] Gateway response timeout after 8000ms.`);
    return res.status(504).json({ success: false, message: "Payment response timed out." });
  }

  if (chaosState.dbDeadlock) {
    console.error(`[${traceId}] [DATABASE-SERVICE] [500 FATAL] Transaction Deadlock detected (PGSQL Code: 40P01).`);
    return res.status(500).json({ success: false, message: "Internal server error: Database deadlock." });
  }

  // DEFAULT SUCCESS PATH
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  console.log(`[${traceId}] [ORDER-SERVICE] [200 SUCCESS] Order ${orderId} committed successfully!`);
  console.log(`==================================================\n`);

  return res.status(200).json({
    success: true,
    orderId,
    message: "Order placed successfully!"
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server active on http://localhost:${PORT}`));
import incrementalCache from "@opennextjs/cloudflare/kv-cache";
import memoryQueue from "@opennextjs/cloudflare/memory-queue";


const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      // set `incrementalCache` to "dummy" to disable KV cache
      incrementalCache: () => incrementalCache,

      tagCache: "dummy",
      queue: () => memoryQueue,
    },
  },

  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;

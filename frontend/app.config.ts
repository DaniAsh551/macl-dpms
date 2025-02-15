import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    ssr: false,
    vite: {
        server:{
            allowedHosts: [ "localhost", "frontend", "dpms.danimv.top" ]
        }
    }
});

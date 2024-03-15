interface ImportMetaEnv {
	readonly VITE_GOOGLE_CLIENT_ID: string;
	readonly VITE_GOOGLE_CLIENT_SECRET: string;
	readonly VITE_BASE_URL: string;
	readonly VITE_BASE_EMAIL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

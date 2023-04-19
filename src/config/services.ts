class ConfigService {
		constructor(private readonly  env : {[key : string] : string | undefined} ){
			
		}

		get(key: string, throwOnMissing = false) {
			const value = this.env[key];
			if (!value && throwOnMissing) {
				throw new Error(`read config error - missing env.${key}`);
			}
			return value;
		}
	
		getMany(keys: string[]) {
			keys.forEach((key) => this.get(key, true));
			return this;
		}
}


const envKeys : string[] = [
	"SKIP_PREFLIGHT_CHECK",
	"REACT_APP_API_URL",
	"REACT_APP_URL_FE",
	"REACT_APP_GOOGLE_API_TOKEN",
	"REACT_APP_ENVIROMENT"
]

export const configService = new ConfigService(process.env).getMany(envKeys);
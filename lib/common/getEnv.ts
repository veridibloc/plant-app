export function getEnv(name: string): string {
    if(!process.env[name]){
        throw new Error(`Missing environment variable ${name}`);
    }
    return process.env[name] as string;
}

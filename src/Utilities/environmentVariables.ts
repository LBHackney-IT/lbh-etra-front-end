export default function getEnvVariable(key: string) : string {
    const url = window.location.hostname.toLowerCase();
    let prefix = "REACT_APP_";
    
    if(url.includes("dev")){
        prefix += "DEV";
    }
    else if(url.includes("staging")){
        prefix += "STAGING";
    }
    else {
        prefix += "PROD";
    }

    return process.env[`${prefix}_${key}`] || "";
}
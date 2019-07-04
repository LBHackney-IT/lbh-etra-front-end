export default function getEnvVariable(key: string) : string {
    const url = window.location.hostname.toLowerCase();
    let prefix = "REACT_APP_";
    
    if(url.includes("prod")){
        prefix += "PROD";
    }
    else if(url.includes("staging")){
        prefix += "STAGING";
    }
    else {
        prefix += "DEV";
    }

    return process.env[`${prefix}_${key}`] || "";
}
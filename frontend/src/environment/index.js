const env_urls = {
    STAGE: 'http://localhost'
}


const environments = {
    stage: {
        authors: `${env_urls.STAGE}/api/`
    }
}

export default environments[import.meta.env.REACT_APP_ENV] || environments['stage'];
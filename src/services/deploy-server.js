export async function deployServer() {
    console.log('deploy-server');

    const response = await fetch(process.env.TRIGGER_DEPLOYMENT_URL, {
        method: 'GET',
    });

    return response;
}

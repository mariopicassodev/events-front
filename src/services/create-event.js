import Cookies from 'js-cookie';
export async function createEvent(name, description, location, schedule, fee, maxCapacity) {

    const token = Cookies.get('Bearer');
    const user_id = Cookies.get('user_id');
    console.log(token, user_id);

    // print all parameeters one per line
    console.log(name);
    console.log(description);
    console.log(location);
    console.log(schedule);
    console.log(fee);
    console.log(maxCapacity);


    const query = `
        mutation {
            createEvent(
                name: "${name}",
                description: "${description}",
                location: "${location}",
                schedule: "${schedule}",
                ownerId: ${user_id},
                fee: ${fee},
                maxCapacity: ${maxCapacity}
            )
            {
                id
                name
                description
                location
                schedule
                ownerId
                fee
                maxCapacity
            }
        }
    `;

    const response = await fetch(`http://localhost:4000/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    });



    return response;
}

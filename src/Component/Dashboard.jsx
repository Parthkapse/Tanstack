import { useQuery } from '@tanstack/react-query'

function Dashboard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch(
        'https://67eb8090aa794fb3222a74f6.mockapi.io/users/users',
      )
      return await response.json()
    }
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <input type="text" name="name" placeholder="First Name"  />
        <input type="text" name="lastName" placeholder="Last Name"  />
        <input type="text" name="address" placeholder="Address"  />
        <input type="number" name="age" placeholder="Age"  />

        {/* Action Buttons */}
        <br />
        <input type="text" placeholder="Enter ID for Update/Delete"  />
        <button >Add</button>
        <button >Update</button>
        <button >Delete</button>
      <table border="1" >
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>lastName</th>
          <th>Address</th>
          <th>Age</th>

        </tr>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.Address}</td>
            <td>{user.Age}</td>

          </tr>
        ))}
      </table>
    </div>

  )
};


export default Dashboard;

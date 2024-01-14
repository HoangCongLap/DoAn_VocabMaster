// import React, { useEffect, useState } from 'react';
// import Logo from '../Logo';
// import { useAuth } from '~/lib/firebase';

// export function AllUserGetter() {
//   const [users, setUsers] = useState<object[]>([]);
//   const auth = useAuth();

//   function listAllUsers(nextPageToken?: string) {
//     if (!auth) {
//       return;
//     }
//     auth.
//       .listUsers(1000, nextPageToken)
//       .then((listUsersResult: any) => {
//         const userList = listUsersResult.users.map((userRecord: any) => userRecord.toJSON());
//         setUsers((prevUsers) => [...prevUsers, ...userList]);

//         if (listUsersResult.pageToken) {
//           // List next batch of users.
//           listAllUsers(listUsersResult.pageToken);
//         }
//       })
//       .catch((error: any) => {
//         console.log('Error listing users:', error);
//       });
//   }
//   useEffect(() => {
//     listAllUsers();
//   }, [auth]);
//   console.log('user', users);
//   return (
//     <div>
//       <Logo />
//       <h2>User List:</h2>
//       <ul>
//         {users.map((user, index) => (
//           <li key={index}>{JSON.stringify(user)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

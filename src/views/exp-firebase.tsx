// import { database } from '@/firebase.ts';
// import { ref, onValue, off } from 'firebase/database';
// import { useEffect, useState } from 'react';
//
// export const HEHE = () => {
//   const [value, setValue] = useState('');
//   useEffect(() => {
//     const caidaubuoi = ref(database, '/gates/gate_1');
//     const unsubcribeCaidaubuoi = onValue(caidaubuoi, (snapshot) => {
//       setValue(snapshot.val());
//     });
//     return () => {
//       off(caidaubuoi);
//     };
//   }, []);
//   console.log(value)
//   return (<div>
//
//   </div>);
// };
//

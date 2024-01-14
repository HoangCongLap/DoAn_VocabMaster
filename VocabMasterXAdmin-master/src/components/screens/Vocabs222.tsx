// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Head } from '~/components/shared/Head';
// import { useAuth } from '~/lib/firebase';
// import { FaEdit, FaVolumeUp } from 'react-icons/fa';
// import { Avatar } from '@dropzone-ui/react';

// export interface Vocabulary {
//   id: number;
//   content: string;
//   phonetic: string;
//   position: string;
//   lesson_id: number;
//   course_id: number;
//   audio: string;
//   picture: string;
//   trans: string;
//   trans_hint: string;
//   en_hint: string;
// }
// function Index() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   const [vocabs, setVocabs] = useState<Vocabulary[]>([]);
//   const [lastIds, setLastIds] = useState([0]);
//   const [pageNumber, setPageNumber] = useState(0);

//   const auth = useAuth();
//   const getData = async () => {
//     setIsLoading(true);

//     const id = await auth?.currentUser?.getIdToken();
//     const url = 'https://pi.nhalq.dev/kimochiapi/api/vocabs/from';
//     const response = await axios.get<Vocabulary[]>(
//       url,

//       {
//         headers: { Authorization: `Bearer ${id}` },
//         params: {
//           fromId: vocabs[vocabs.length - 1]?.id + 1 || 0,
//           limit: 1000,
//         },
//       },
//     );
//     const listNewVocabs = [...vocabs];
//     const hs = new Set<number>();
//     listNewVocabs.map((t) => hs.add(t.id));
//     const list = response.data
//       .filter((vocab) => !hs.has(vocab.id))
//       .map(async (vocab) => {
//         return axios
//           .head(vocab.picture)
//           .then((response) => {
//             if (response && response.status === 200) {
//               return {
//                 vocab,
//                 isSuccess: true,
//               };
//             }
//             return {
//               vocab,
//               isSuccess: false,
//             };
//           })
//           .catch((e) => ({
//             vocab,
//             isSuccess: false,
//           }));
//       });
//     const headValues = await Promise.all(list);
//     listNewVocabs.push(...headValues.filter((t) => t.isSuccess === false).map((t) => t.vocab));
//     listNewVocabs.sort((a, b) => a.id - b.id);
//     setVocabs(listNewVocabs);
//     setLastIds((pre) => [...pre, listNewVocabs.length]);
//     setPageNumber((p) => p + 1);
//     setIsLoading(false);
//   };
//   const nextPage = () => {
//     getData();
//   };
//   useEffect(() => {
//     if (auth?.currentUser) {
//       getData();
//     }
//   }, [auth?.currentUser]);
//   const handleChangeSource = (selectedFile: File, vocab: Vocabulary) => {
//     uploadFile(selectedFile, vocab);
//   };
//   const listVocabs = vocabs.slice(lastIds[lastIds.length - 2], lastIds[lastIds.length - 1] + 1);

//   const uploadFile = async (file: File, vocab: Vocabulary) => {
//     const formData = new FormData();
//     formData.append('vocabId', `${vocab.id}`);
//     formData.append('file', file);
//     console.log('>> formData >> ', formData);
//     const id = await auth?.currentUser?.getIdToken();

//     axios
//       .post('https://pi.nhalq.dev/kimochiapi/api/uploadvocabphoto', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${id}`,
//         },
//       })
//       .then(function () {
//         console.log('SUCCESS!!');
//       })
//       .catch(function () {
//         console.log('FAILURE!!');
//       });
//   };
//   console.log('vocabs', vocabs);
//   const renderBody = () => {
//     if (isLoading) {
//       return (
//         <>
//           <tr>
//             <td colSpan={5} style={{ verticalAlign: 'top' }}>
//               <progress className="progress" />
//             </td>
//           </tr>
//         </>
//       );
//     }
//     return listVocabs.map((vocab, index) => {
//       return (
//         <tr key={vocab.id}>
//           <th>
//             <label>
//               {vocab.id}
//               {/* <input type="checkbox" className="checkbox" /> */}
//             </label>
//           </th>
//           <td className=" max-w-[20rem] whitespace-normal">
//             <div className="flex items-center space-x-3">
//               <div className="avatar">
//                 <div className="mask mask-squircle w-20 h-20">
//                   <Avatar
//                     src={vocab.picture}
//                     alt="Avatar Error"
//                     onChange={(file) => handleChangeSource(file, vocab)}
//                     smartImgFit="center"
//                     style={{ width: '100%', height: '100%' }}
//                     readOnly={!editMode}
//                     accept=".jpg, .png"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="font-bold ">{vocab.content}</div>
//                 <div className="text-sm opacity-50">{vocab.phonetic}</div>
//               </div>
//             </div>
//           </td>
//           <td className=" max-w-[30rem] whitespace-normal">
//             {vocab.trans}
//             <br />
//             <span className="badge badge-ghost badge-sm">{vocab.en_hint}</span>
//           </td>
//           <td>
//             <div className="flex gap-2">
//               <button
//                 className="btn btn-ghost btn-xs"
//                 // className="cursor-pointer"
//                 onClick={() => {
//                   new Audio(vocab.audio).play();
//                 }}
//               >
//                 <FaVolumeUp fontSize={15} />
//               </button>
//               <p>{`(${vocab.position})`}</p>
//             </div>
//           </td>
//           <th>
//             <button className="btn btn-ghost btn-xs">
//               <FaEdit fontSize={20} />
//             </button>
//           </th>
//         </tr>
//       );
//     });
//   };
//   const renderContent = () => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-2">
//             <p className="font-bold">Edit Mode</p>
//             <input
//               type="checkbox"
//               className="toggle toggle-success"
//               onChange={(e) => {
//                 setEditMode(e.target.checked);
//               }}
//             />
//           </div>
//           <div>
//             <div className="join flex justify-end">
//               <button className="join-item rounded-none rounded-l-lg btn">«</button>
//               <button className="join-item rounded-none btn">{`Page ${pageNumber}`}</button>
//               <button className="join-item rounded-none rounded-r-lg btn" onClick={nextPage}>
//                 »
//               </button>
//             </div>
//             <div>Total: {listVocabs.length} Vocabs</div>
//           </div>
//         </div>
//         <table className="table table-lg w-full">
//           <thead>
//             <tr>
//               <th className="column-width-1">
//                 <label>
//                   Id
//                   {/* <input type="checkbox" className="checkbox" /> */}
//                 </label>
//               </th>
//               <th>Vocab</th>
//               <th>Trans</th>
//               <th>Postion</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody className="h-[650px]">{renderBody()}</tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1">
//       <Head title="Vocabs" />
//       <div className="flex-1">
//         <div className="text-center hero-content">
//           <div className="w-[980px]">{renderContent()}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Index;

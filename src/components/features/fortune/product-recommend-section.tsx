// import ProductRecommend from './product-recommend';

// const products = [
//   {
//     productId: '1',
//     productImage: '/tarotcards/A4.png',
//     productName: 'Rock 1',
//     price: 500,
//   },
//   {
//     productId: '2',
//     productImage: '/tarotcards/A12.png',
//     productName: 'Rock 2',
//     price: 900,
//   },
//   {
//     productId: '3',
//     productImage: '/tarotcards/C3.png',
//     productName: 'Rock 3',
//     price: 700,
//   },
// ];

// export default function ProductRecommendSection() {
//   return (
//     <div className="flex flex-col p-8 items-center gap-6">
//       <div className="flex flex-col gap-4 text-center font-saraban">
//         <h1 className="text-4xl text-white">ของมูที่เราแนะนำ</h1>
//         <h3 className="text-lg text-white">
//           คัดสรรเครื่องรางแท้ จากแหล่งที่เชื่อถือได้ทั่วโลก
//         </h3>
//       </div>
//       <div className="flex w-full h-full justify-between gap-10 px-24">
//         {products.map((el) => (
//           <ProductRecommend
//             key={el.productId}
//             productId={el.productId}
//             productName={el.productName}
//             productImage={el.productImage}
//             price={el.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

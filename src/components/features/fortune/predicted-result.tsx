import CardFlip from './card-flip';

export default function PredictedResult() {
  return (
    <div className="mt-16 py-16 px-16 bg-black/60">
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <CardFlip imageUrl="/tarotcards/A1.png" />
          <div className="flex flex-col gap-2 text-white font-aclonica">
            <h1 className="text-2xl">1. ตัวคุณเป็นเช่นไรในช่วงนี้</h1>
            <h2 className="text-lg">ไพ่ 3 ดาบ (THE THREE OF SWORDS)</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil et
              quos odit enim, velit quis sequi quae nostrum. Fugiat deleniti
              rerum aspernatur soluta quaerat doloribus, unde recusandae iusto
              at dolores dolorum perspiciatis fugit laudantium expedita qui
              autem ipsa ipsum numquam ratione, magnam quo facilis itaque. Cum
              sit beatae cumque, sed neque, hic saepe non nemo sunt voluptatibus
              dolores doloribus ipsa nam laboriosam provident itaque architecto
              aperiam, quo adipisci explicabo dolorum aspernatur porro ab
              dignissimos. Et optio perferendis explicabo quis cum, aspernatur
              rem illum eius molestiae exercitationem accusamus amet similique
              eligendi culpa. Sunt, voluptatum ad tempora dolore consectetur
              itaque totam. Sed.
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <CardFlip imageUrl="/tarotcards/C14.png" />
          <div className="flex flex-col gap-2 text-white font-aclonica">
            <h1 className="text-2xl">
              2. สิ่งที่ผ่านมาในอดีต (ลูกน้อง/บริวาร)
            </h1>
            <h2 className="text-lg">เทพีแห่งพรหมลิขิต (WHEEL OF FORTUNE)</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil et
              quos odit enim, velit quis sequi quae nostrum. Fugiat deleniti
              rerum aspernatur soluta quaerat doloribus, unde recusandae iusto
              at dolores dolorum perspiciatis fugit laudantium expedita qui
              autem ipsa ipsum numquam ratione, magnam quo facilis itaque. Cum
              sit beatae cumque, sed neque, hic saepe non nemo sunt voluptatibus
              dolores doloribus ipsa nam laboriosam provident itaque architecto
              aperiam, quo adipisci explicabo dolorum aspernatur porro ab
              dignissimos. Et optio perferendis explicabo quis cum, aspernatur
              rem illum eius molestiae exercitationem accusamus amet similique
              eligendi culpa. Sunt, voluptatum ad tempora dolore consectetur
              itaque totam. Sed.
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <CardFlip imageUrl="/tarotcards/SW7.png" />
          <div className="flex flex-col gap-2 text-white font-aclonica">
            <h1 className="text-2xl">3.สิ่งที่จะเกิดขึ้นในอนาคต</h1>
            <h2 className="text-lg">ไพ่ 5 ไม้เท้า (THE FIVES OF WANDS)</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil et
              quos odit enim, velit quis sequi quae nostrum. Fugiat deleniti
              rerum aspernatur soluta quaerat doloribus, unde recusandae iusto
              at dolores dolorum perspiciatis fugit laudantium expedita qui
              autem ipsa ipsum numquam ratione, magnam quo facilis itaque. Cum
              sit beatae cumque, sed neque, hic saepe non nemo sunt voluptatibus
              dolores doloribus ipsa nam laboriosam provident itaque architecto
              aperiam, quo adipisci explicabo dolorum aspernatur porro ab
              dignissimos. Et optio perferendis explicabo quis cum, aspernatur
              rem illum eius molestiae exercitationem accusamus amet similique
              eligendi culpa. Sunt, voluptatum ad tempora dolore consectetur
              itaque totam. Sed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

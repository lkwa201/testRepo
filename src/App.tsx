import {useRef, useState} from 'react';

interface ProductType {
  id: number;
  name:string;
  explanation:string;
  price:number;
}

interface ProductItemProps {
  product : ProductType
  onDelete: (id:number) => void
  onUpdate : (id:number) => void
}

const ProductItem = ({product, onDelete, onUpdate} : ProductItemProps) => {
  const {id, name, price, explanation} = product;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
      <div>
        <div>{id}</div>
        <div>{name}</div>
        <div>{price}</div>
        <div>{explanation}</div>
        <button onClick={() => onDelete(id)}>삭제하기</button>
        <button onClick={() => onUpdate(id)}>수정하기</button>
      </div>
  )
}

function App() {

  const [products, setProducts] = useState<ProductType[]>([
    {
      id : 0,
      name : "IPhone 13 mx",
      explanation : '설명이 들어옵니다.',
      price : 1230000
    }
  ]);

  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  //let fakeId = 0;
  const fakeId = useRef(0);
  const handleCreate = (newProduct : Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    setProducts([...products, {
      ...newProduct,
      id:fakeId.current
    }])
  }

  //삭제하기
  const handleDelete = (id:number) => setProducts(products.filter((product) => product.id !== id));

  //수정하기
  const handleUpdate = (id:number) => {
      const updateProduct = {
          id,
          name : "수정된 상품",
          explanation : "수정된 상품",
          price : 0
      };

      setProducts(
          products.map((product) => product.id === id ? updateProduct : product)
      )
  }

  return (
      <>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleCreate({name, explanation, price})

        }}>
          <input value={name}
              onChange={(event) =>setName(event.target.value)}  type={"text"} placeholder={"상품이름"}/>

          <input value={explanation}
                 onChange={(event) => setExplanation(event.target.value)} type={"text"} placeholder={"상품 설명"}/>

          <input
              value={price}
              onChange={(event) => setPrice(parseInt(event.target.value, 10))}
              type={"number"} placeholder={"상품 가격"}/>
          <input type={"submit"} value={"상품 만들기"}/>
        </form>

        {products.map((product) =>
            <ProductItem key={product.id} product={product} onDelete={handleDelete} onUpdate={handleUpdate}/>
        )}
      </>
  )


}

export default App;

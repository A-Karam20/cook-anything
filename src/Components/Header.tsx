type Props = {
    text1: string,
    text2: string
}

export const Header : React.FC<Props>= ({text1,text2}) => {
    return(
        <header className="bg-white py-4 px-8 shadow-lg">
    <h1 className="text-3xl font-bold text-gray-800">{text1}</h1>
    <p className="text-gray-600">{text2}</p>
  </header>
    );
}
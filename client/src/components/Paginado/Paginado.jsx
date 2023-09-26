const Paginado = ({ videogamesPerPage, videogames, paginado }) => {
    const pagesNumber = [];
  
    for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
      pagesNumber.push(i);
    }
  
    return (
      <nav>
        <ul className="paginado">
          {pagesNumber && pagesNumber.map((number) => (
            <ul key={number} className="number">
                <ul>
                    <button onClick={() => paginado(number)}>{number}</button>
                </ul>
            </ul>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Paginado;
  
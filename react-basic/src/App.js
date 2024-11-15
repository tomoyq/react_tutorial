import logo from './logo.svg';
import './App.css';

import {Article, Image, Counter, Toggle} from './components/index';

//エントリポイントを使えば一行でimportできる
// import Article from './components/Article';
// import Image from './components/LogoImage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Counter />

        <Toggle />

        {/* <Image
          img={logo}
          src={'src/App.js'}
        /> */}

        <Article
          title={'React入門'}
          content={'初めてcomponentをつくりました。'}
        />

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;

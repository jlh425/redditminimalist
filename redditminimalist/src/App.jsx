import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Subreddits from './components/Subreddits/Subreddits';

function App() {
  return (
    <>
      <Navbar className="app-navbar" />
      <div className="app-container" >
        <main>
          <Home className="app-main-content" />
        </main>
        <aside>
          <Subreddits ClassName="app-sidebar" />
        </aside>
      </div>
    </>
  );
}

export default App;
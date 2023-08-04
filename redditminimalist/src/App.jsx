import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Subreddits from './components/Subreddits/Subreddits';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;

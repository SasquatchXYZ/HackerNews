import React, {Component} from 'react';
import './App.css';

const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


// App ES6 Class Component (Uses Local State) --------------------------------------------------------------------------
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    // Bindings
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
  }

  setSearchTopStories(result) {
    const {hits, page} = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: {
        hits: updatedHits,
        page
      }
    })
  }

  fetchSearchTopStories(searchTerm, page = 0) {

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.log(error));
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit(event) {
    event.preventDefault();

    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm)
  }

  onDismiss(id) {
    /*const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId());*/

    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    })
  }

  // Lifecycle Method
  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm)
  }

  // Lifecycle Method
  render() {
    const {searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    // console.log(this.state.result);
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search:
          </Search>
        </div>
        {result
          ? <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
          : null
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

// Functional Stateless Components -------------------------------------------------------------------------------------
// Search Component
const Search = ({value, onChange, onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
    </form>
  )
};

// Table Component
const Table = ({list, onDismiss}) => {
  const largeColumn = {
    width: '40%'
  };

  const midColumn = {
    width: '30%'
  };

  const smallColumn = {
    width: '10%'
  };

  return (
    <div className="table">
      {list.map(item =>
        <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
          <span style={midColumn}>
          {item.author}
        </span>
          <span style={smallColumn}>
          {item.num_comments}
        </span>
          <span style={smallColumn}>
          {item.points}
        </span>
          <span style={smallColumn}>
          <Button onClick={() => onDismiss(item.objectID)}
                  className="button-inline"
          >
            Dismiss
          </Button>
        </span>
        </div>
      )}
    </div>
  )
};

// Button Component
const Button = ({onClick, className = '', children}) => (
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>
);

export default App;

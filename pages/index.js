import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";

export const Greet = props => (
  <Layout>
    <h1>Hello Next.js</h1>
  </Layout>
);

export default class Index extends React.Component {
  static getInitialProps = async () => {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();

    return { shows: data };
  };
// styled jsx has no effect for elements inside of child.
// or use global prop in style component.
  render() {
    return (
      <div>
        <h1>Batman TV shows</h1>
        <ul>
          {this.props.shows.map(({ show }) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
          h1,
          a {
            font-family: "Arial";
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </div>
    );
  }
}

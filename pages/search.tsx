import React, { useRef, useState } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/nav";
import PleaseLogin from "../components/PleaseLogin";
import LoadingIndicator from "../components/LoadingIndicator";
import HttpUtils from "../utils/http_utils";
import UserModel from "../models/user_model";
import Link from "next/link";

enum SearchState {
  GotResults,
  Searching,
  NoResults,
}

export default function Page() {
  const [session, loading] = useSession();
  const [searchInput, setSearchInput] = useState("");
  const searchInputEl = useRef<HTMLInputElement>();
  const [searchResults, setSearchResults] = useState<UserModel[]>([]);
  const [searchState, setSearchState] = useState(SearchState.GotResults);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = searchInputEl.current.value;
    setSearchState(SearchState.Searching);
    const searchResponse = await HttpUtils.fetchRequest<UserModel[]>(
      `/api/search/${value}`
    );
    const results = searchResponse.data;
    setSearchState(
      results.length === 0 ? SearchState.NoResults : SearchState.GotResults
    );
    setSearchResults(results);
  };

  if (loading) return LoadingIndicator();
  if (!session) return PleaseLogin();
  return (
    <>
      <Nav />
      <form onSubmit={handleSearch} className="m-2">
        <input
          className="border-black border-2 rounded-sm"
          type="text"
          placeholder="Digite um curso"
          ref={searchInputEl}
          value={searchInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(event.currentTarget.value)
          }
        />
        <button type="submit">Pesquisar</button>
      </form>
      {searchState === SearchState.Searching ? (
        LoadingIndicator()
      ) : searchState === SearchState.NoResults ? (
        <div>Nenhum professor encontrado</div>
      ) : (
        <div>
          {searchResults.map((result) => (
            <div key={result.name}>
              <Link href={`/teachers/${result._id}`}>
                <a>{result.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

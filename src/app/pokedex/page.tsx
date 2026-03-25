"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
        );
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Błąd podczas pobierania pokemonów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <header className="bg-red-600 shadow-lg border-b-8 border-gray-900 border-opacity-20 top-0 z-10 w-full rounded-b-xl z-index-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center shadow-inner">
              <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-gray-400"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase origin-left italic drop-shadow-md">
              Pokedex
            </h1>
          </div>
          <Link
            href="/"
            className="text-white bg-gray-900 bg-opacity-30 hover:bg-opacity-50 px-5 py-2 rounded-full font-bold transition-all text-sm uppercase shadow-sm"
          >
            Wyloguj
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pokemons.map((pokemon) => {
              const id = pokemon.url.split("/").filter(Boolean).pop();

              return (
                <div
                  key={pokemon.name}
                  className="bg-white rounded-3xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-500 group cursor-pointer relative mt-12"
                >
                  <div className="p-6 flex justify-center bg-transparent relative z-10 -mt-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                      alt={pokemon.name}
                      className="w-40 h-40 drop-shadow-2xl group-hover:scale-125 group-hover:-translate-y-6 transition-transform duration-100 ease-out"
                    />
                  </div>
                  <div className="p-5 text-center bg-gray-50 rounded-b-3xl -mt-6 pt-10">
                    <span className="text-sm font-black text-gray-400 mb-1 block">
                      #{String(id).padStart(3, "0")}
                    </span>
                    <h2 className="text-xl font-extrabold text-gray-800 capitalize tracking-wide">
                      {pokemon.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

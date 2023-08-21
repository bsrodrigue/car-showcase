"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    try {
      setLoading(true);
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2023,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });
      setAllCars(result);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">
            <CustomFilter setFilter={setFuel} options={fuels} title="fuel" />
            <CustomFilter setFilter={setYear} options={yearsOfProduction} title="year" />
          </div>
        </div>
        {
          loading && (
            <div className="mt-16 w-full flex-center">
              {/* <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain" /> */}
            </div>
          )
        }
        {
          allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {
                  allCars?.map((car: any) => (
                    <CarCard car={car} />
                  ))
                }
              </div>

              <ShowMore
                pageNumber={(limit) / 10}
                isNext={limit > allCars.length}
                setLimit={setLimit}
              />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-x1 font-bold">Aye, no results</h2>
            </div>
          )
        }
      </div>
    </main>
  )
}

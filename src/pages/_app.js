import "@/styles/globals.css";
import AldaataiUgProvider from "./context/AldaataiUgContext";
import ScoreProvider from "./context/ScoreContext";
import LevelProvider from "./context/LevelContext";
import UserProvider from "./context/UserContext";
import DataDuremProvider from "./context/data/DataDurem";
import DataDuremUgProvider from "./context/data/DataDuremUg";
import DataKheltsProvider from "./context/data/DataKheltsContext";
import KheltsLevelProvider from "./context/KheltsLevelContext";
import DataJuramProvider from "./context/data/DataJuramContext";
import JuramLevelProvider from "./context/JuramLevelContext";
import DataTailbarProvider from "./context/data/DataTailbarContext";
import TailbarLevelProvider from "./context/TailbarLevelContext";
import WordleUgProvider from "./context/WordleUgContext";
export default function App({ Component, pageProps }) {
  return (
    <ScoreProvider>
      <LevelProvider>
        <AldaataiUgProvider>
          <UserProvider>
            <DataDuremProvider>
              <DataDuremUgProvider>
                <DataKheltsProvider>
                  <KheltsLevelProvider>
                    <DataJuramProvider>
                      <JuramLevelProvider>
                        <DataTailbarProvider>
                          <TailbarLevelProvider>
                            <WordleUgProvider>
                              <Component {...pageProps} />
                            </WordleUgProvider>
                          </TailbarLevelProvider>
                        </DataTailbarProvider>
                      </JuramLevelProvider>
                    </DataJuramProvider>
                  </KheltsLevelProvider>
                </DataKheltsProvider>
              </DataDuremUgProvider>
            </DataDuremProvider>
          </UserProvider>
        </AldaataiUgProvider>
      </LevelProvider>
    </ScoreProvider>
  );
}

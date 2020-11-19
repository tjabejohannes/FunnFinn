# FunnFinn
FunnFinn gjør det lettere å finne gode funn på Finn (prøv å si det tre ganger fort), ved å enkelt la deg finne ut hvor lang tid det tar å til en annonses adresse. Utvidelsen legger til en ny knapp på annonser som har lagt til adresse eller stedsnavn som tar deg til Google Maps, som viser reiserute og reisetid fra annonsens adresse til den du har lagt til i popup-menyen. Denne utvidelsen er spesielt nyttig om man for eksempel er på boligjakt og reisetid fra en bolig til for eksempel jobb eller bysentrum er en viktig faktor. Man slipper da å åpne Maps i en ny fane og taste inn adressene for hver bolig.


# Test ut i Firefox

1. Klon repoet
```
git clone git@github.com:tjabejohannes/FunnFinn.git
```
2. Åpne `about:debugging` i addressebaren og velg **This Firefox**
3. Trykk **Load Temporary Add-on**
4. Velg `manifest.json` eller en annen kildefil

FunnFinn skal nå være lastet i denne sesjonen. Om man lukker Firefox og åpner det på nytt må man også på nytt laste inn utvidelsen ved å utføre steg 2-4.

## Hvordan bruke

På annonsesider skal en ny knapp <img src="https://github.com/tjabejohannes/FunnFinn/blob/main/PaaFinn/images/MapsGoogle.png" width=27> være lagt inn under bildene, og en Finn-logo <img src="https://github.com/tjabejohannes/FunnFinn/blob/main/PaaFinn/icons/funnfinn.png" width="27"> skal være lagt til til høyre for adressebaren i nettleseren. Trykker du på logoen kan du legge inn en vilkårlig adresse (For eksempel **Oslo Sentralstasjon**, eller **Dalevegen 6, 6153 Ørsta**). Når du da trykker på Maps-knappen inne på annonser vil den åpne Google Maps i en ny fane der raskeste reiserute, med reisetid, er lagt inn.

<img src="https://i.imgur.com/UkcGyDn.png">
<img src="https://i.imgur.com/u8pHkeL.png">

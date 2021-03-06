# FunnFinn
FunnFinn gjør det lettere å finne gode funn på Finn (prøv å si det tre ganger fort). Utvidelsen lar deg
enkelt finne avstanden til en annonses adresse. Med et enkelt klikk viser utvidelsen deg reiseruten din i Google Maps, og du kan selv styre hvilken adresse ruten skal beregnes fra via en pop-up-meny.
Denne utvidelsen er spesielt nyttig dersom man for eksempel er på boligjakt, og reisetid fra boligen til for eksempel jobb eller bysentrum er en viktig faktor. Man slipper da å måtte åpne Google Maps i en ny fane og legge inn adressene for hver bolig.

# Installer for Firefox og Chrome

Utvidelsen er tilgjengelig både for [Firefox](https://addons.mozilla.org/nb-NO/firefox/addon/funnfinn/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) og [Chrome](https://chrome.google.com/webstore/detail/funnfinn/bcemakmkcojfaodcjgpgdbcljlhfahjl?hl=no)



# Test ut i Firefox
Om du vil teste lokalt kan du gjøre følgende i Firefox:

1. Klon repoet
```
git clone git@github.com:tjabejohannes/FunnFinn.git
```
2. Åpne `about:debugging` i addressebaren og velg **This Firefox**
3. Trykk **Load Temporary Add-on**
4. Velg `manifest.json` eller en annen kildefil

FunnFinn skal nå være lastet i denne sesjonen. Om man lukker Firefox og åpner det på nytt må man også på nytt laste inn utvidelsen ved å utføre steg 2-4.

## Hvordan bruke

På annonsesider skal en ny knapp <img src="https://github.com/tjabejohannes/FunnFinn/blob/main/PaaFinn/images/MapsGoogle.png" width=27> være lagt inn under bildene, og en FunnFinn-logo <img src="https://github.com/tjabejohannes/FunnFinn/blob/main/PaaFinn/icons/funnfinn.png" width="27"> skal være lagt til til høyre for adressebaren i nettleseren. Trykker du på logoen kan du legge inn en vilkårlig adresse (For eksempel **Oslo Sentralstasjon**, eller **Dalevegen 6, 6153 Ørsta**). Når du da trykker på Maps-knappen inne på annonser vil den åpne Google Maps i en ny fane der raskeste reiserute, med reisetid, er lagt inn.

![alttext](https://i.imgur.com/F1NydXd.png "Knapp til googlemaps")

![alttext](https://i.imgur.com/3Kxqc8Z.png "Popup med destinasjons")


import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';

export interface Button {
  name: string;
  nextStep: () => void;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'cathelijne-verjaardswebsite';
  text: WritableSignal<string> = signal('Lieve Cathelijne, \n \n Ben jij klaar voor je super-de-duper verjaardags-website-verjaardagskaart? ');
  buttons: WritableSignal<Button[]> = signal([{
    name: 'Ik twijfel nog een beetje',
    nextStep: () => this.secondScene(),
    color: 'yellow'
  },{
    name: "zeker weten",
    nextStep: () => this.thirdScene(),
    color: 'green'
  }]);
  isCath: WritableSignal<boolean> = signal(false);
  private audioObj = new Audio();
  isDancing: WritableSignal<boolean> = signal(false);
  isShowingCake: WritableSignal<boolean> = signal(false);
  isBlowingAway: WritableSignal<boolean> = signal(false);





  secondScene(): void {
    this.isCath.set(true)
    this.text.set('')
    this.buttons.set([])

    setTimeout(() => {
      this.text.set('Je kijkt ook een beetje twijfelachtig, moet ik zeggen. We beloven je dat het een top ervaring wordt.')
      setTimeout(() => {
        this.thirdScene();
      }, 4000);
    }, 750);

  }

  thirdScene(): void {
    this.isCath.set(true)
    this.text.set('Op een verjaardag moet er natuurlijk gezongen worden. We hebben een mannenkoor gevonden die speciaal voor jou een liedje heeft ingezongen.\n\n Sta je al op je stoel? ')
    this.buttons.set([{
      name: 'Ja zeker, de stoel en ik zijn er klaar voor',
      nextStep: () => this.fourthScene(),
      color: 'yellow'
    }])
  }



  fourthScene(): void {
    console.log('play')
    this.audioObj.src = 'assets/51-Tony-Angeles-Today-Is-Your-Birthday(chosic.com).mp3'
    this.audioObj.load();
    this.audioObj.loop = true;
    this.audioObj.play();
    this.isDancing.set(true);

    this.buttons.set([]);

    setTimeout(() => {this.text.set('Lekker deuntje hè?');}, 10000)


    setTimeout(() => {

      this.buttons.set([{
        name: 'Laat het ophouden alsjeblieft!',
        nextStep: () => this.fithScene(),
        color: 'yellow'
      }])
    }, 20000)
  }

  fithScene(): void {
    this.audioObj.pause();
    this.isDancing.set(false);
    this.resetDisplay()
    setTimeout(() => {

      this.sixthScene()}, 1000)
  }

  sixthScene(): void {
    console.log('sixth scene');

    this.text.set('Dan is het nu tijd om  de kaartjes uit te blazen van je digitale taart. Adem eerst heel diep in, houd het even vast en blaas de kaarsjes maar uit');
    this.isShowingCake.set(true);
    setTimeout(() => { this.text.set('Ben je al aan het blazen?')
      this.buttons.set([{color: 'green', nextStep: () => this.seventhScene(), name: 'Jahaa'}])}, 6000)
  }

  seventhScene(): void {
    this.resetDisplay();
    setTimeout(() => {
      this.isBlowingAway.set(true);
      this.text.set('Shit je blaast de hele taart weg. Ach online taart is toch niet zo lekker als een echte dikke taart.')
    }, 1000)

    setTimeout(() => {
      this.resetDisplay();
      this.eighthScene();
      this.isShowingCake.set(false);
    }, 5000);
  }

  eighthScene(): void {
    setTimeout(() => {
      this.text.set('Dan is het nu tijd voor het cadeau. Wil je weten wat we voor je hebben bedacht?')
    }, 750)
    setTimeout(() => {
      this.buttons.set([{
        color: 'yellow', nextStep: () => this.ninthScene(), name: 'Ik houd het niet meer van de spanning'
      }])
    }, 750)

  }

  ninthScene(): void {
    this.resetDisplay();
    setTimeout(() => {
      this.text.set('Laten we je een tip geven: Wat is de overeenkomst tussen ons drieën? \n \n Weet je al wat je krijgt van ons? ')
      setTimeout(() => {
        this.buttons.set([{
          color: 'yellow', nextStep: () =>     this.text.set('Je bent de zwakste schakel. Tot ziens. Je gaat niet door voor de wasmachine.\n\nProbeer het opnieuw!')
          , name: 'A. Een puppy'
        }])
        setTimeout(() => {
          this.buttons.set([{
            color: 'yellow', nextStep: () =>     this.text.set('Je bent de zwakste schakel. Tot ziens. Je gaat niet door voor de wasmachine.\n\nProbeer het opnieuw!')
            , name: 'A. Een puppy'
          },{
            color: 'green', nextStep: () =>     this.text.set('Oeeh nu wordt het pijnlijk. We hebben helaas geen tie-dye tanktop voor je. \n\nProbeer het opnieuw')
            , name: 'B. Een tie-dye tanktop voor een groepsvakantie'
          }])
          setTimeout(() => {
            this.buttons.set([{
              color: 'yellow', nextStep: () => this.text.set('Je bent de zwakste schakel. Tot ziens. Je gaat niet door voor de wasmachine.\n\nProbeer het opnieuw!'), name: 'A. Een puppy'
            },{
              color: 'green', nextStep: () => this.text.set('Oeeh nu wordt het pijnlijk. We hebben helaas geen tie-dye tanktop voor je. \n\nProbeer het opnieuw'), name: 'B. Een tie-dye tanktop voor een groepsvakantie'
            },
              {
                color: 'yellow', nextStep: () => this.eleventhScene(), name: 'C. Een derde gaatje in je oor'
              }])
          }, 2000)
        }, 2000)
      }, 4000)
    }, 750)


  }


  eleventhScene(): void {
    setTimeout(() => {
      this.text.set('Waaajoooh hoe heb je dat zo geraden. Nu weet Julia een uitstekende plek waar je dit kan doen. Veel plezier ermee en geniet nog van je verjaardag in de echte wereld. \n\nToedols, ik ben er weer in December. Zullen we dan weer een drankje doen met z\'n drieën? ')
      this.buttons.set([{
        color: 'yellow', nextStep: () => this.endScene(), name: 'Bel 0900-9696 om de afspraak te bevestigen'
      }])

    }, 750)

  }

  endScene(): void {
    this.audioObj.play();
    this.isDancing.set(true)
  }

  resetDisplay(): void {
    this.text.set('');
    this.buttons.set([]);

  }

}

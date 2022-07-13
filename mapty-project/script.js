"use strict";

///////////////////////////////////////////////////////////////////////
// NOTE THIS IS APP CLASS
class App {
  constructor() {
    this.map;
    this.mapEvent;
    this.workouts = [];

    this._getLocalStorage();
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your current position!");
        }
      );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const croods = [latitude, longitude];
    this.map = L.map("map").setView(croods, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.map.on("click", this._showForm.bind(this));
    this.workouts.forEach((w) => this._renderWorkoutMarker(w));
  }

  _showForm(mapEv) {
    this.mapEvent = mapEv;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    // Helper functions
    const validate = (...inputs) => inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    // 1. get date from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.mapEvent.latlng;
    let workout;

    // chekce if data is valid
    // 3. if workout is running create running object
    if (type === "running") {
      const cadance = +inputCadence.value;

      if (
        !validate(duration, distance, cadance) ||
        !allPositive(duration, distance, cadance)
      )
        return alert("inputs have to be positive number!");

      workout = new Running([lat, lng], distance, duration, cadance);
    }

    // chekce if data is valid
    // 4. if workout is cycling create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;

      if (
        !validate(duration, distance, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("inputs have to be positive number!");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // 5. add workout to workout array
    this.workouts.push(workout);

    // 6. render workout on map as a marker
    this._renderWorkoutMarker(workout);

    // 7. render workout in the list
    this._renderWorkout(workout);

    // 8. hide the form
    // 9. clear input feilds
    this._hideForm();

    // 10. Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.croods)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♂️"} ${workout.descreption}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
            <li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
      <h2 class="workout__title">${workout.descreption}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♂️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;

    if (workout.type === "running")
      html += `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadance}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
    `;

    if (workout.type === "cycling")
      html += `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.eleveationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li> 
    `;

    form.insertAdjacentHTML("afterend", html);
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    if (!workoutEl) return;

    const workout = this.workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );

    this.map.setView(workout.croods, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));

    if (!data) return;

    this.workouts = data;

    this.workouts.forEach((w) => this._renderWorkout(w));
  }
}

///////////////////////////////////////////////////////////////////////
// NOTE THIS IS WORKOUT CLASS
class Workout {
  constructor(croods, distance, duration) {
    this.date = new Date();
    this.id = (Date.now() + "").slice(-10);
    this.croods = croods;
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.descreption = "";
  }

  _setDescreption() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.descreption = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

///////////////////////////////////////////////////////////////////////
// NOTE THIS IS RUNNING CLASS
class Running extends Workout {
  constructor(croods, distance, duration, cadance) {
    super(croods, distance, duration);
    this.cadance = cadance;
    this.type = "running";
    this.pace = this.calcPace();
    this._setDescreption();
  }

  calcPace() {
    return this.duration / this.distance;
  }
}

///////////////////////////////////////////////////////////////////////
// NOTE THIS IS CYCLING CLASS
class Cycling extends Workout {
  constructor(croods, distance, duration, eleveationGain) {
    super(croods, distance, duration);
    this.eleveationGain = eleveationGain;
    this.type = "cycling";
    this.speed = this.calcSpeed();
    this._setDescreption();
  }

  calcSpeed() {
    return this.distance / (this.duration / 60);
  }
}

///////////////////////////////////////////////////////////////////////
// NOTE THIS IS VARIABLES
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

///////////////////////////////////////////////////////////////////////
// NOTE THIS IS OBJECTS
const app = new App();

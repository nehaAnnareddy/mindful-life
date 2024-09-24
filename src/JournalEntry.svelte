<script>
//This component handles the main journal entry form, including tracking moods, 
//hours slept, gratitude, and file uploads.

    import PreviousEntries from './PreviousEntries.svelte';
    import Swal from 'sweetalert2';
    import EditEntry from './EditEntry.svelte'; 

    export let reflection = '';
    export let gratitude = '';
    export let gratitudeList = [];
    export let file = null;
    export let imageUrl = null;
    export let waterIntake = 0;
    export let hoursSlept = 0;
    export let tookPills = "";

    const maxHours = 15;
    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0]; 
    
    export let moods = [
        { id: 1, emoji: '😔', label: 'Sad' },
        { id: 2, emoji: '😕', label: 'Confused' },
        { id: 3, emoji: '😐', label: 'Neutral' },
        { id: 4, emoji: '🙂', label: 'Happy' },
        { id: 5, emoji: '😀', label: 'Excited' },
        { id: 6, emoji: '😎', label: 'Cool' }
    ];
    export let selectedMoods = [];
    
    export let previousEntries = [
        { 
            id: 1, 
            date: '2024-09-15', 
            reflection: 'Had a productive day working on UI assignments.', 
            gratitudeList: ['Family', 'Good health'], 
            waterIntake: 8, 
            hoursSlept: 7, 
            tookPills: "",
            selectedMoods: ['😀', '🙂'],
            imageUrl: '/public/Day1.jpg'
        },
        { 
            id: 2, 
            date: '2024-09-16', 
            reflection: 'Feeling a bit down today. I wish I could hang out with my friends.', 
            gratitudeList: ['Friends'], 
            waterIntake: 6, 
            hoursSlept: 6, 
            tookPills: "",
            selectedMoods: ['😕', '😔'],
            imageUrl: '/public/Day2.jpg'
        },
        { 
            id: 3, 
            date: '2024-09-17', 
            reflection: 'Super excited about new plans I made with friends to go to New York. Also got a Job Offer!', 
            gratitudeList: ['Job offer', 'Sunny day', 'New York'], 
            waterIntake: 9, 
            hoursSlept: 8, 
            tookPills: "Yes",
            selectedMoods: ['😀', '😎'],
            imageUrl: '/public/Day3.jpg'
        },
        { 
            id: 4, 
            date: '2024-09-18', 
            reflection: 'Took a day off for myself. Stayed up watching K-dramas.', 
            gratitudeList: ['K-dramas', 'Music'], 
            waterIntake: 4, 
            hoursSlept: 5, 
            tookPills: "Yes",
            selectedMoods: ['😐', '😕'],
            imageUrl: '/public/Day4.jpg'
        },
        { 
            id: 5, 
            date: '2024-09-19', 
            reflection: 'Enjoyed quiet time doing assignments at the library with my friends.', 
            gratitudeList: ['Quiet time', 'Coffee'], 
            waterIntake: 7, 
            hoursSlept: 9, 
            tookPills: "No",
            selectedMoods: ['🙂', '😎'],
            imageUrl: '/public/Day5.jpg'
        }
    ];

    //Functions to Edit Previous Entries
    let editingEntry = null;

    function editEntry(entry) {
        editingEntry = entry; 
    }

    function saveEditedEntry(event) {
      const updatedEntry = event.detail;
      // Update entry in the previousEntries array
      previousEntries = previousEntries.map(e => e.id === updatedEntry.id ? updatedEntry : e);
      editingEntry = null;
      calculateSummary(); 
    }

    // Customization and Summary Dropdowns
    let showWaterIntake = true;
    let showHoursSlept = true;
    let showPillTracking = false;
    let isDropdownVisible = false;

    let showSummary = false;
    let sleepWaterSummary = '';


    function toggleDropdown() {
        isDropdownVisible = !isDropdownVisible;
    }

    function toggleSummary() {
        showSummary = !showSummary;
    }

    // Calculate summary of sleep and water
    function calculateSummary() {
        let sleepSummary = '';
        let waterSummary = '';
        const validSleepEntries = previousEntries.filter(entry => entry.hoursSlept > 0);
        const totalSleep = validSleepEntries.reduce((acc, entry) => acc + entry.hoursSlept, 0);
        const averageSleep = totalSleep / validSleepEntries.length;
        const goalSleepDays = validSleepEntries.filter(entry => entry.hoursSlept >= 7).length;
        sleepSummary = `Average Sleep: ${averageSleep.toFixed(2)} hours. Met the goal of 7 hours of sleep per day on ${goalSleepDays} day(s).`;

        const validWaterEntries = previousEntries.filter(entry => entry.waterIntake > 0);
        const totalWater = validWaterEntries.reduce((acc, entry) => acc + entry.waterIntake, 0);
        const averageWater = totalWater / validWaterEntries.length;
        const goalWaterDays = validWaterEntries.filter(entry => entry.waterIntake >= 8).length;
        waterSummary = `Average Water Intake: ${averageWater.toFixed(2)} glasses. Met the goal of 8 glasses of water per day on ${goalWaterDays} day(s).`;

        sleepWaterSummary = `${sleepSummary}\n${waterSummary}`;
    }

    // Update summary when previous entries change
    $: calculateSummary();

    export function addToGratitudeList() {
      if (gratitude) {
        gratitudeList = [...gratitudeList, gratitude];
        gratitude = '';
      }
    }

    export function removeGratitude(index) {
        gratitudeList = gratitudeList.filter((_, i) => i !== index);
    }

    export function handleFileUpload(event) {
      file = event.target.files[0];
      if (file) {
        imageUrl = URL.createObjectURL(file);
      }
    }
  
    export function incrementSleep() {
      if (hoursSlept < maxHours) hoursSlept += 1;
    }
  
    export function decrementSleep() {
      if (hoursSlept > 0) {
        hoursSlept -= 1;
      }
    }
  
    export function generateSleepZs() {
      return 'z'.repeat(hoursSlept).toUpperCase();
    }

    export function toggleMood(id) {
        if (selectedMoods.includes(id)) {
        selectedMoods = selectedMoods.filter(mood => mood !== id);
        } else {
        selectedMoods = [...selectedMoods, id];
        }
    }

    export function submitJournalEntry() {
        const newEntry = {
            id: previousEntries.length + 1,
            date: dateOnly,
            reflection,
            gratitudeList,
            waterIntake,
            hoursSlept,
            tookPills,
            selectedMoods: moods.filter(mood => selectedMoods.includes(mood.id)).map(mood => mood.emoji),
            imageUrl
        };

        // Add new entry to previousEntries array
        previousEntries = [...previousEntries, newEntry];
        calculateSummary(); 

        // Popup with form data
        Swal.fire(`Form Submitted:
        Reflection: ${reflection}
        Gratitude List: ${gratitudeList.join(', ')}
        Water Intake: ${waterIntake} glasses
        Hours Slept: ${hoursSlept} hours
        Took Pills: ${tookPills}
        Moods: ${newEntry.selectedMoods.join(', ')}
        `);

        // Reset fields after submission
        reflection = '';
        gratitudeList = [];
        file = null;
        imageUrl = '';
        waterIntake = 0;
        hoursSlept = 0;
        selectedMoods = [];
        tookPills = '';
    }
  </script>
  
  <style>


    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center; 
        gap: 20px; 
        width: 80%;
        margin: 0 auto;
    }

    .card {
        margin-top: 100px;
        background-color: #ffffff; 
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 350px;
        
        /* Background image for cards */
        background-image: url('/abstract-white-wavy-ripple-pattern-background-curve-line-texture-for-modern-graphic-design-element-website-banner-and-poster-or-business-card-decoration-vector.jpg'); 
        background-size: cover; 
        background-position: center; 
        background-repeat: no-repeat; 
    }

    textarea, input[type="text"], input[type="range"] {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .image-preview img {
        max-width: 100%;
        max-height: 200px;
        border-radius: 10px;
        object-fit: contain;
    }

    button {
        margin-top: 10px;
        padding: 10px;
        background-color: #ff6d94;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #b30000;
    }
  
    .sleep-tracker {
      margin-top: 20px;
      text-align: center;
    }
  
    .z-bar {
      margin-top: 10px;
      background-color: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      width: 300px;
      height: 30px;
    }
  
    .z-bar-fill {
      background-color: #ff4c79;
      height: 100%;
      text-align: center;
      color: white;
      line-height: 30px;
      border-radius: 10px;
      font-size: 18px;
      transition: width 0.3s ease;
    }
  
    button {
      margin-top: 10px;
      padding: 10px;
      background-color: #ff6d94;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #b30000;
    }
  
    .gratitude-list {
        margin-top: 10px;
        text-align: left;
        padding-left: 0;
    }

    .gratitude-list li {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style-type: disc;
        padding-left: 10px;
    }

    .remove-button {
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        cursor: pointer;
    }

    .remove-button:hover {
        background-color: #c82333;
    }

    .mood-checkbox {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .mood-checkbox.selected {
        background-color: #ff6d94;
        color: white;
    }

    .mood-selector {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .button-container {
        display: flex;
        justify-content: center; 
        gap: 50px; 
        margin-top: 20px; 
    }
    
    .dropdown-container {
        display: inline-block;
    }

    .dropdown-toggle {
        background-color: #ff6a97;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }

    .dropdown-menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: white;
        min-width: 200px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        z-index: 1;
        padding: 10px;
        margin-top: 5px;
    }

    .custom-checkbox {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .custom-checkbox input {
        margin-right: 10px;
    }

    .checkmark {
        height: 20px;
        width: 20px;
        background-color: #e2e8f0;
        border-radius: 5px;
        margin-right: 10px;
        position: relative;
    }

    .custom-checkbox input:checked + .checkmark {
        background-color: #6b46c1;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .custom-checkbox input:checked + .checkmark:after {
        display: block;
    }

    .custom-checkbox .checkmark:after {
        left: 7px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .summary-section {
        margin-top: 100px;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 10px;
    }

    input[type="checkbox"] {
        display: none;
    }
    
    .submit-section {
        display: flex;
        justify-content: center; 
        margin-top: 20px;
    }

    .submit-button {
        margin-top: 20px;
        padding: 8px 16px;
        background-color: #ff3c7a;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: auto; 
    }

        .submit-button:hover {
            background-color: #cc3c7f;
        }

  
    .image-preview {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
    }
  
    .image-preview img {
      max-width: 100%;
      max-height: 200px;
      border-radius: 10px;
      object-fit: contain;
    }

  </style>

<!-- Buttons Section -->
<div class="button-container">
  <!-- Summary Button -->
  <div class="dropdown-container">
      <button class="dropdown-toggle" on:click={toggleSummary}>
          📊 Summary
      </button>
  </div>

  <!-- Customize Cards Dropdown -->
  <div class="dropdown-container">
      <button class="dropdown-toggle" on:click={toggleDropdown}>
          ⚙ Customize Cards
      </button>
      {#if isDropdownVisible}
          <div class="dropdown-menu">
              <label class="custom-checkbox">
                  <input type="checkbox" bind:checked={showWaterIntake}>
                  <span class="checkmark"></span> Water Intake
              </label>
              <label class="custom-checkbox">
                  <input type="checkbox" bind:checked={showHoursSlept}>
                  <span class="checkmark"></span> Sleep Tracker
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" bind:checked={showPillTracking}>
                <span class="checkmark"></span> Pill Tracker
            </label>
          </div>
      {/if}
  </div>
</div>

    <!-- Summary Section -->
    {#if showSummary}
      <div class="summary-section">
          <p style="white-space: pre-line;">{sleepWaterSummary}</p>
      </div>
    {/if}

  
    <div class="container">
    <!-- Daily Reflection Card -->
    <div class="card">
      <h2>Daily Reflection</h2>
      <textarea bind:value={reflection} placeholder="Write about your day..."></textarea>
    </div>
  
    <!-- Image Upload Card -->
    <div class="card">
      <h2>Image Upload</h2>
      <input type="file" on:change={handleFileUpload} />
      {#if file}
        <div class="image-preview">
          <img src={imageUrl} alt="your img" />
        </div>
      {/if}
    </div>
  
    <!-- Gratitude List Card -->
    <div class="card">
        <h2>Gratitude List</h2>
        <input type="text" bind:value={gratitude} placeholder="Add something you're grateful for..." />
        <button on:click={addToGratitudeList}>ADD TO GRATITUDE LIST</button>
      
        {#if gratitudeList.length > 0}
          <ul class="gratitude-list">
            {#each gratitudeList as item, index}
              <li>
                {item}
                <button class="remove-button" on:click={() => removeGratitude(index)}>–</button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
  
    <!-- Water Intake Card -->
    {#if showWaterIntake}
    <div class="card">
      <h2>Water Intake</h2>
      <input type="range" min="0" max="10" step="1" bind:value={waterIntake} />
      <p>Water intake: {waterIntake} glasses</p>
    </div>
    {/if}
  
    <!-- Hours Slept Card -->
    {#if showHoursSlept}
    <div class="card">
    <div class="sleep-tracker">
      <h2>Hours Slept</h2>
      <button class="button" on:click={decrementSleep}>-</button>
      <span>{hoursSlept} hours</span>
      <button class="button" on:click={incrementSleep}>+</button>
  
      <!-- Progress Bar -->
      <div class="z-bar">
        <div class="z-bar-fill" style="width: {hoursSlept / maxHours * 100}%;">
          {generateSleepZs()}
        </div>
      </div>
    </div>
</div>
{/if}
  
    <!--  Pill Tracking Card -->
    {#if showPillTracking}
    <div class="card">
        <h2>Pill Tracking</h2>
        <h3>Did you take your pills today?</h3>
        <label>
        <input type="radio" name="pills" value="yes" bind:group={tookPills} />
        Yes
        </label>
        <label>
        <input type="radio" name="pills" value="no" bind:group={tookPills} />
        No
        </label>
    </div>
    {/if}

    <!-- Mood Selector Card -->
    <div class="card">
        <h2>My Feelings</h2>
        <div class="mood-selector">
          {#each moods as mood}
            <label class="mood-checkbox {selectedMoods.includes(mood.id) ? 'selected' : ''}">
              <input type="checkbox" bind:group={selectedMoods} value={mood.id} />
              {mood.emoji} {mood.label}
            </label>
          {/each}
        </div>
      </div>
      
  </div>
  
  <!-- Submit Button -->
  <div class="submit-section">
    <button class="submit-button" on:click={submitJournalEntry}>Submit</button>
  </div>

<!-- Previous Entries Section -->
<PreviousEntries {previousEntries} editEntry={editEntry} />

<!-- Edit Entries Section -->
{#if editingEntry}
    <EditEntry entry={editingEntry} on:save={saveEditedEntry} />
{/if}

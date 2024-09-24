<script>

  //This is the main component where the journal’s functionalities and layout come together

  import JournalEntry from './JournalEntry.svelte';
  import ProfileCard from './ProfileCard.svelte'; 

  let reflection = '';
  let gratitude = '';
  let gratitudeList = [];
  let file = null;
  let waterIntake = 0;
  let hoursSlept = 0;
  let tookPills = '';
  let selectedMoods = [];
  let currentDate = new Date().toLocaleString();

  // Navbar variables
  let userName = 'Neha Annareddy';
  let userImage = '/public/personimage.jpg';
  let showProfileCard = false;

  function toggleProfileCard() {
    showProfileCard = !showProfileCard;
  }

  // Update currentDate
  setInterval(() => {
    currentDate = new Date().toLocaleString();}, 1000);

</script>

<style>

  /* PSA container */
  .psa {
    background-color: hsl(0, 0%, 100%); /* Yellow background */
    color: #333; /* Dark text color */
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  
  /* Navbar container */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 40px;
    border-bottom: 1px solid #e5e5e5; 
  }

  /* Logo  */
  .logo-section {
    display: flex;
    align-items: center;
    gap: 8px; 
  }

  .logo-text {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937; 
  }

  /* User Profile Section */
  .user-profile {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .user-name {
    background-color: #f3f4f6; 
    color: #2b3440; 
    padding: 4px 12px;
    border-radius: 9999px; 
    font-size: 14px;
    font-weight: bold;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  /* Profile Card Container */
  .profile-card-container {
    position: absolute;
    top: 80px;
    right: 20px;
    z-index: 100;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

</style>

<!-- PSA  -->
<div class="psa">
  This is only a prototype website. All buttons need to be reclicked in order to close any dropdowns. Thank you for your patience.
</div>

<!-- Navbar  -->
<nav class="navbar">
  <!-- Logo Section (Code from Figma)-->
  <div class="logo-section">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" fill="currentColor">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
      ></path>
    </svg>
    <span class="logo-text">Mindful Life</span>
  </div>

  <!-- User Profile Section -->
  <div class="user-profile" on:click={toggleProfileCard}>
    <span class="user-name">{userName}</span>
    <img src={userImage} alt="User avatar" class="user-avatar" />
  </div>
</nav>

{#if showProfileCard}
  <!-- Show Profile Card when user clicks on the icon -->
  <div class="profile-card-container">
    <ProfileCard {userName} {userImage} />
  </div>
{/if}

<!-- Header -->
<div class="header text-center mt-8">
  <h1 class="text-4xl font-bold text-gray-900">My Daily Journey</h1>
  <p class="text-lg font-semibold text-gray-700 mt-2">{currentDate}</p>
</div>

<!-- JournalEntry component with props -->
<JournalEntry
  bind:reflection={reflection}
  bind:gratitude={gratitude}
  bind:gratitudeList={gratitudeList}
  bind:file={file}
  bind:waterIntake={waterIntake}
  bind:hoursSlept={hoursSlept}
  bind:tookPills={tookPills}
  bind:selectedMoods={selectedMoods}
/>

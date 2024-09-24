<script>

//The profile card shows basic user info and tracks user activity, 
//such as days since they started and active days.


    export let userName = 'Neha Annareddy';
    export let userImage = '/mnt/data/image.png';
    export let location = 'Cincinnati, OH'; 
    export let daysStarted = 0;
    export let activeDays = 5;

    function calculateDaysSinceStart() {
      const startDate = new Date('2024-09-15');
      const today = new Date();
      const timeDiff = today.getTime() - startDate.getTime();
      daysStarted = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    //Run each time component is opened
    import { onMount } from 'svelte';
    onMount(() => {
      calculateDaysSinceStart();
    });

  </script>
  
  <style>
    .profile-card {
      width: 300px;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  
    .profile-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
    }
  
    .user-name {
      font-size: 18px;
      font-weight: bold;
      color: #1f2937;
    }
  
    .user-location {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 10px;
    }
  
    .stats {
      display: flex;
      justify-content: space-between;
    }
  
    .stat-item {
      text-align: center;
    }
  
    .stat-item h3 {
      font-size: 18px;
      font-weight: bold;
      color: #1f2937;
    }
  
    .stat-item p {
      font-size: 12px;
      color: #6b7280;
    }
  </style>
  
  <div class="profile-card">
    <img src={userImage} alt="User Image" class="profile-image" />
    <h2 class="user-name">{userName}</h2>
    <p class="user-location">{location}</p>

  
    <div class="stats">
      <div class="stat-item">
        <h3>{daysStarted}</h3>
        <p>Days since you started</p>
      </div>
      <div class="stat-item">
        <h3>{activeDays}</h3>
        <p>Active days in a row</p>
      </div>
    </div>
  </div>
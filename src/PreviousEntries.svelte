<script>
//This component displays previously submitted entries, 
//showing the reflection, water intake, hours slept, and other details.

    export let previousEntries = []; 
    export let editEntry; 
</script>

<style>
    .previous-entries {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
    }

    .entry-card {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
    }

    .entry-content {
        flex: 1; 
        padding-right: 20px; 
    }

    .entry-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .gratitude-list {
        margin: 10px 0;
        list-style-type: disc;
        padding-left: 20px;
    }

    /* Image container */
    .image-preview {
        flex-shrink: 0;
        margin-left: 20px; 
    }

    .image-preview img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
    }

    .edit-button {
        background-color: #ff6d94;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        position: absolute;
        bottom: 10px; 
        right: 10px; 
    }

    .edit-button:hover {
        background-color: #b30000;
    }

    .header {
        text-align: center;
        margin-bottom: 20px;
    }
</style>

<div class='header'>
    <h1>Previous Entries</h1>
</div>

<div class="previous-entries">
    {#each previousEntries as entry}
        <div class="entry-card">
            <div class="entry-content">
                <div class="entry-header">
                    <h3>Entry from {entry.date}</h3>
                    <p>Moods: {entry.selectedMoods.join(', ')}</p>
                </div>
                <p><strong>Reflection:</strong> {entry.reflection}</p>
                
                <!-- Only display values if it's greater than 0 -->
                {#if entry.hoursSlept && entry.hoursSlept > 0}
                    <p><strong>Hours Slept:</strong> {entry.hoursSlept} hours</p>
                {/if}
                
                {#if entry.waterIntake && entry.waterIntake > 0}
                    <p><strong>Water Intake:</strong> {entry.waterIntake} glasses</p>
                {/if}
                
                {#if entry.tookPills !== null && entry.tookPills !== ""}
                    <p><strong>Pills Taken:</strong> {entry.tookPills === "Yes" ? "Yes" : "No"}</p>
                {/if}
                
                <p><strong>Gratitude List:</strong></p>
                <ul class="gratitude-list">
                    {#each entry.gratitudeList as gratitude}
                        <li>{gratitude}</li>
                    {/each}
                </ul>
            </div>

            {#if entry.imageUrl}
                <div class="image-preview">
                    <img src={entry.imageUrl} alt="Uploaded Image" />
                </div>
            {/if}

            <!-- Edit button -->
            <button class="edit-button" on:click={() => editEntry(entry)}>Edit</button>
        </div>
    {/each}
</div>

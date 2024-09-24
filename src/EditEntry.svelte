<script>

    //This is the modal that opens when a user wants to edit a journal entry.
    import { createEventDispatcher } from 'svelte';

    export let entry;
    export let moods = [
        { id: 1, emoji: '😔', label: 'Sad' },
        { id: 2, emoji: '😕', label: 'Confused' },
        { id: 3, emoji: '😐', label: 'Neutral' },
        { id: 4, emoji: '🙂', label: 'Happy' },
        { id: 5, emoji: '😀', label: 'Excited' },
        { id: 6, emoji: '😎', label: 'Cool' }
    ];

    const dispatch = createEventDispatcher();

    let reflection = entry?.reflection ?? '';
    let gratitude = ''; 
    let gratitudeList = entry?.gratitudeList ? [...entry.gratitudeList] : [];
    let waterIntake = entry?.waterIntake ?? 0;
    let hoursSlept = entry?.hoursSlept ?? 0;
    let tookPills = entry?.tookPills ?? '';
    let selectedMoods = entry?.selectedMoods ? [...entry.selectedMoods] : [];
    let imageUrl = entry?.imageUrl ?? null;
    let file = null;

    function addToGratitudeList() {
        if (gratitude) {
            gratitudeList = [...gratitudeList, gratitude];
            gratitude = '';
        }
    }

    function handleFileUpload(event) {
        file = event.target.files[0];
        if (file) {
            imageUrl = URL.createObjectURL(file);
        }
    }

    function toggleMood(emoji) {
        if (selectedMoods.includes(emoji)) {
            selectedMoods = selectedMoods.filter(mood => mood !== emoji);
        } else {
            selectedMoods = [...selectedMoods, emoji];
        }
    }

    function saveEntry() {
        if (entry) {
            const updatedEntry = {
                ...entry,
                reflection,
                gratitudeList,
                waterIntake,
                hoursSlept,
                tookPills,
                selectedMoods,
                imageUrl
            };
            dispatch('save', updatedEntry);
        }
    }
</script>

<style>
    /* Blurred background */
    .blur-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); 
        backdrop-filter: blur(10px);
        z-index: 999; 
    }

    .edit-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        max-height: 80vh; 
        overflow-y: auto; 
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 10px;
        z-index: 1000;
    }

    .modal-content {
        text-align: center;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr); 
        gap: 20px;
    }

    .card {
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
        min-height: 200px;
    }

    .image-preview img {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        object-fit: cover;
    }

    .mood-selector {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
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

    .save-button {
        padding: 10px;
        background-color: #ff6d94;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        width: 100px;
        align-self: center;
    }

    .save-button:hover {
        background-color: #b30000;
    }
</style>

{#if entry}
    <!-- Overlay  -->
    <div class="blur-background"></div>
    
    <!-- Pop up Modal -->
    <div class="edit-modal">
        <div class="modal-content">
            <h2>Edit Entry for {entry.date}</h2>

            <div class="grid-container">
                <!-- Daily Reflection Card -->
                <div class="card">
                    <h2>Daily Reflection</h2>
                    <textarea bind:value={reflection}></textarea>
                </div>

                <!-- Image Upload Card -->
                <div class="card">
                    <h2>Image Upload</h2>
                    <input type="file" on:change={handleFileUpload} />
                    {#if imageUrl}
                        <div class="image-preview">
                            <img src={imageUrl} alt="Image Preview" />
                        </div>
                    {/if}
                </div>

                <!-- Gratitude List Card -->
                <div class="card">
                    <h2>Gratitude List</h2>
                    <input type="text" bind:value={gratitude} placeholder="Add something you're grateful for..." />
                    <button on:click={addToGratitudeList}>Add to Gratitude List</button>
                    {#if gratitudeList.length > 0}
                        <ul>
                            {#each gratitudeList as gratitudeItem}
                                <li>{gratitudeItem}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>

                <!-- Water Intake Card -->
                <div class="card">
                    <h2>Water Intake</h2>
                    <input type="range" min="0" max="10" bind:value={waterIntake} />
                    <p>{waterIntake} glasses</p>
                </div>

                <!-- Hours Slept Card -->
                <div class="card">
                    <h2>Hours Slept</h2>
                    <input type="number" min="0" max="15" bind:value={hoursSlept} />
                </div>
                
                <!-- Pills Taken Card -->
                <div class="card">
                    <h2>Pill Tracking</h2>
                    <label>
                        <input type="radio" name="pills" value="Yes" bind:group={tookPills} /> Yes
                    </label>
                    <label>
                        <input type="radio" name="pills" value="No" bind:group={tookPills} /> No
                    </label>
                </div>

                <!-- Mood Selector Card -->
                <div class="card">
                    <h2>Edit Your Moods</h2>
                    <div class="mood-selector">
                        {#each moods as mood}
                            <label class="mood-checkbox {selectedMoods.includes(mood.emoji) ? 'selected' : ''}" on:click={() => toggleMood(mood.emoji)}>
                                {mood.emoji} {mood.label}
                            </label>
                        {/each}
                    </div>
                </div>
            </div>

            <button class="save-button" on:click={saveEntry}>Save</button>
        </div>
    </div>
{/if}




import { useState } from "react";
import { useSettings } from "../context/useSettings";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Task completion sound setting
  const { sound, language } = useSettings();

  // =================================================
  // LANGUAGE TEXT
  // =================================================

  const text = {
    English: {
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      markImportant: "Mark as important",
      removeImportant: "Remove from important"
    },

    "বাংলা": {
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      markImportant: "গুরুত্বপূর্ণ হিসেবে চিহ্নিত করুন",
      removeImportant: "গুরুত্বপূর্ণ তালিকা থেকে সরান"
    },

    "हिन्दी": {
      save: "सहेजें",
      cancel: "रद्द करें",
      edit: "संपादित करें",
      delete: "हटाएँ",
      markImportant: "महत्वपूर्ण के रूप में चिह्नित करें",
      removeImportant: "महत्वपूर्ण से हटाएँ"
    }
  };

  const currentText =
    text[language] || text.English;

  // =================================================
  // IMPORTANT TASK
  // =================================================

  const [isImportant, setIsImportant] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("taskflowImportantTasks") || "[]"
    );

    return saved.includes(task._id);
  });

  // =================================================
  // PLAY SOUND
  // =================================================

  const playCompleteSound = () => {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContext();

      const playNote = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = frequency;

        gainNode.gain.setValueAtTime(
          0.001,
          startTime
        );

        gainNode.gain.exponentialRampToValueAtTime(
          0.25,
          startTime + 0.02
        );

        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + duration
        );

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Success chime: 3 notes
      playNote(
        523.25,
        audioContext.currentTime,
        0.18
      );

      playNote(
        659.25,
        audioContext.currentTime + 0.12,
        0.18
      );

      playNote(
        783.99,
        audioContext.currentTime + 0.24,
        0.25
      );

      setTimeout(() => {
        audioContext.close();
      }, 600);
    } catch (error) {
      console.error("Sound error:", error);
    }
  };

  // =================================================
  // EDIT TASK
  // =================================================

  const handleEdit = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  // =================================================
  // SAVE EDIT
  // =================================================

  const handleSave = () => {
    const trimmedText = editText.trim();

    if (trimmedText === "") {
      return;
    }

    onEdit(task._id, trimmedText);

    setIsEditing(false);
  };

  // =================================================
  // CANCEL EDIT
  // =================================================

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  // =================================================
  // IMPORTANT STAR
  // =================================================

  const handleImportant = () => {
    setIsImportant((current) => {
      const saved = JSON.parse(
        localStorage.getItem(
          "taskflowImportantTasks"
        ) || "[]"
      );

      let updated;

      if (current) {
        // Remove task from important
        updated = saved.filter(
          (id) => id !== task._id
        );
      } else {
        // Add task to important
        updated = [
          ...new Set([
            ...saved,
            task._id
          ])
        ];
      }

      localStorage.setItem(
        "taskflowImportantTasks",
        JSON.stringify(updated)
      );

      return !current;
    });
  };

  return (
    <div className="task-item">

      {/* =================================================
          LEFT SIDE
          ================================================= */}

      <div
        className="task-left"
        style={{ minWidth: 0 }}
      >

        {/* Complete Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => {
            // Sound plays only when completing the task
            // AND when Task Completion Sound is ON
            if (!task.completed && sound) {
              playCompleteSound();
            }

            onToggle(task._id);
          }}
        />

        {/* Task Text / Edit Input */}
        {isEditing ? (
          <input
            className="edit-task-input"
            type="text"
            value={editText}
            onChange={(event) =>
              setEditText(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave();
              }

              if (event.key === "Escape") {
                handleCancel();
              }
            }}
            autoFocus
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              flex: "1 1 0",
              boxSizing: "border-box"
            }}
          />
        ) : (
          <span
            className={
              task.completed
                ? "completed-task"
                : ""
            }
          >
            {task.text}
          </span>
        )}
      </div>

      {/* =================================================
          RIGHT SIDE
          ================================================= */}

      <div className="task-actions">

        {isEditing ? (
          <>
            {/* Save */}
            <button
              type="button"
              className="save-button"
              onClick={handleSave}
            >
              {currentText.save}
            </button>

            {/* Cancel */}
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              {currentText.cancel}
            </button>
          </>
        ) : (
          <>
            {/* =================================================
                IMPORTANT STAR
                ================================================= */}

            <button
              type="button"
              className={
                isImportant
                  ? "important-button active"
                  : "important-button"
              }
              onClick={handleImportant}
              title={
                isImportant
                  ? currentText.removeImportant
                  : currentText.markImportant
              }
              aria-label={
                isImportant
                  ? currentText.removeImportant
                  : currentText.markImportant
              }
            >
              {isImportant ? "⭐" : "☆"}
            </button>

            {/* Edit */}
            <button
              type="button"
              className="edit-button"
              onClick={handleEdit}
            >
              {currentText.edit}
            </button>

            {/* Delete */}
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(task._id)}
            >
              {currentText.delete}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default TaskItem;

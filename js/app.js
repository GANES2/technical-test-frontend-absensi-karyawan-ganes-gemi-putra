(function () {
  const STORAGE_KEY = "absensi-karyawan-records";

  const seedRecords = [
    {
      id: "att-001",
      name: "Raka Pratama",
      address: "Jl. Melati No. 12, Bandung",
      gender: "Laki-laki",
      date: "2026-06-02",
      timeIn: "08:00",
      timeOut: "17:05"
    },
    {
      id: "att-002",
      name: "Nadia Kirana",
      address: "Jl. Cempaka No. 8, Jakarta",
      gender: "Perempuan",
      date: "2026-06-02",
      timeIn: "08:10",
      timeOut: "17:00"
    },
    {
      id: "att-003",
      name: "Dimas Arya",
      address: "Jl. Pahlawan No. 21, Yogyakarta",
      gender: "Laki-laki",
      date: "2026-06-01",
      timeIn: "07:55",
      timeOut: "16:45"
    },
    {
      id: "att-004",
      name: "Sinta Laras",
      address: "Jl. Kenanga No. 4, Surabaya",
      gender: "Perempuan",
      date: "2026-06-01",
      timeIn: "08:20",
      timeOut: "17:15"
    },
    {
      id: "att-005",
      name: "Bagas Saputra",
      address: "Jl. Anggrek No. 30, Semarang",
      gender: "Laki-laki",
      date: "2026-05-31",
      timeIn: "08:05",
      timeOut: "16:55"
    },
    {
      id: "att-006",
      name: "Maya Lestari",
      address: "Jl. Diponegoro No. 19, Malang",
      gender: "Perempuan",
      date: "2026-05-31",
      timeIn: "08:00",
      timeOut: "17:10"
    },
    {
      id: "att-007",
      name: "Fajar Maulana",
      address: "Jl. Merdeka No. 77, Bekasi",
      gender: "Laki-laki",
      date: "2026-05-30",
      timeIn: "07:45",
      timeOut: "16:50"
    },
    {
      id: "att-008",
      name: "Aulia Putri",
      address: "Jl. Sudirman No. 16, Depok",
      gender: "Perempuan",
      date: "2026-05-30",
      timeIn: "08:15",
      timeOut: "17:20"
    },
    {
      id: "att-009",
      name: "Iqbal Ramadhan",
      address: "Jl. Veteran No. 5, Bogor",
      gender: "Laki-laki",
      date: "2026-05-29",
      timeIn: "08:30",
      timeOut: "17:00"
    },
    {
      id: "att-010",
      name: "Tiara Anjani",
      address: "Jl. Flamboyan No. 10, Tangerang",
      gender: "Perempuan",
      date: "2026-05-29",
      timeIn: "07:50",
      timeOut: "16:40"
    },
    {
      id: "att-011",
      name: "Rizky Aditya",
      address: "Jl. Ahmad Yani No. 11, Solo",
      gender: "Laki-laki",
      date: "2026-05-28",
      timeIn: "08:00",
      timeOut: "17:30"
    },
    {
      id: "att-012",
      name: "Citra Maharani",
      address: "Jl. Gatot Subroto No. 3, Medan",
      gender: "Perempuan",
      date: "2026-05-28",
      timeIn: "08:25",
      timeOut: "17:05"
    }
  ];

  const state = {
    currentPage: 1,
    deleteId: null,
    pageSize: 5,
    query: "",
    sortDirection: "desc",
    sortField: "date"
  };

  let records = loadRecords();

  const elements = {
    averageDuration: document.getElementById("averageDuration"),
    attendanceForm: document.getElementById("attendanceForm"),
    backToListButton: document.getElementById("backToListButton"),
    breadcrumbCurrent: document.getElementById("breadcrumbCurrent"),
    cancelDeleteButton: document.getElementById("cancelDeleteButton"),
    confirmDeleteButton: document.getElementById("confirmDeleteButton"),
    createRecordButton: document.getElementById("createRecordButton"),
    deleteModal: document.getElementById("deleteModal"),
    formTitle: document.getElementById("formTitle"),
    pageSize: document.getElementById("pageSize"),
    pagination: document.getElementById("pagination"),
    paginationInfo: document.getElementById("paginationInfo"),
    resetFormButton: document.getElementById("resetFormButton"),
    searchInput: document.getElementById("searchInput"),
    sidebar: document.getElementById("sidebar"),
    sidebarToggle: document.getElementById("sidebarToggle"),
    sortDirection: document.getElementById("sortDirection"),
    sortField: document.getElementById("sortField"),
    submitButton: document.getElementById("submitButton"),
    tableBody: document.getElementById("attendanceTableBody"),
    tableSummary: document.getElementById("tableSummary"),
    todayLabel: document.getElementById("todayLabel"),
    todayRecords: document.getElementById("todayRecords"),
    toast: document.getElementById("toast"),
    totalRecords: document.getElementById("totalRecords"),
    viewLinks: document.querySelectorAll("[data-view-link]"),
    views: document.querySelectorAll("[data-view]")
  };

  const fields = {
    address: document.getElementById("address"),
    date: document.getElementById("date"),
    gender: document.getElementById("gender"),
    name: document.getElementById("name"),
    recordId: document.getElementById("recordId"),
    timeIn: document.getElementById("timeIn"),
    timeOut: document.getElementById("timeOut")
  };

  init();

  function init() {
    elements.todayLabel.textContent = formatDate(toDateInputValue(new Date()));
    fields.date.value = toDateInputValue(new Date());
    bindEvents();
    syncControls();
    render();
  }

  function bindEvents() {
    elements.viewLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const view = link.dataset.viewLink;
        if (view === "form") {
          openCreateForm();
          return;
        }
        showView("list");
      });
    });

    elements.sidebarToggle.addEventListener("click", () => {
      elements.sidebar.classList.toggle("is-open");
    });

    elements.createRecordButton.addEventListener("click", openCreateForm);
    elements.backToListButton.addEventListener("click", () => showView("list"));
    elements.resetFormButton.addEventListener("click", resetForm);
    elements.attendanceForm.addEventListener("submit", handleSubmit);

    const handleSearchChange = (event) => {
      state.query = event.target.value.trim().toLowerCase();
      state.currentPage = 1;
      renderTable();
    };

    elements.searchInput.addEventListener("input", handleSearchChange);
    elements.searchInput.addEventListener("search", handleSearchChange);

    elements.sortField.addEventListener("change", (event) => {
      state.sortField = event.target.value;
      state.currentPage = 1;
      renderTable();
    });

    elements.sortDirection.addEventListener("change", (event) => {
      state.sortDirection = event.target.value;
      state.currentPage = 1;
      renderTable();
    });

    elements.pageSize.addEventListener("change", (event) => {
      state.pageSize = Number(event.target.value);
      state.currentPage = 1;
      renderTable();
    });

    document.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        if (state.sortField === button.dataset.sort) {
          state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
        } else {
          state.sortField = button.dataset.sort;
          state.sortDirection = "asc";
        }
        syncControls();
        state.currentPage = 1;
        renderTable();
      });
    });

    elements.tableBody.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;

      const record = records.find((item) => item.id === button.dataset.id);
      if (!record) return;

      if (button.dataset.action === "edit") {
        openEditForm(record);
        return;
      }

      if (button.dataset.action === "delete") {
        state.deleteId = record.id;
        elements.deleteModal.classList.remove("is-hidden");
      }
    });

    elements.cancelDeleteButton.addEventListener("click", closeDeleteModal);
    elements.confirmDeleteButton.addEventListener("click", deleteSelectedRecord);

    elements.pagination.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (!button || button.disabled) return;
      state.currentPage = Number(button.dataset.page);
      renderTable();
    });
  }

  function loadRecords() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) && saved.length ? saved : seedRecords;
    } catch (error) {
      return seedRecords;
    }
  }

  function saveRecords() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  function render() {
    renderStats();
    renderTable();
  }

  function renderStats() {
    const today = toDateInputValue(new Date());
    const totalMinutes = records.reduce((sum, record) => sum + getDurationMinutes(record.timeIn, record.timeOut), 0);
    const averageMinutes = records.length ? Math.round(totalMinutes / records.length) : 0;

    elements.totalRecords.textContent = records.length;
    elements.todayRecords.textContent = records.filter((record) => record.date === today).length;
    elements.averageDuration.textContent = formatDuration(averageMinutes);
  }

  function renderTable() {
    const filteredRecords = getFilteredRecords();
    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / state.pageSize));
    state.currentPage = Math.min(state.currentPage, totalPages);

    const startIndex = (state.currentPage - 1) * state.pageSize;
    const visibleRecords = filteredRecords.slice(startIndex, startIndex + state.pageSize);

    updateSortButtons();
    elements.tableSummary.textContent = `Menampilkan ${filteredRecords.length} dari ${records.length} data absensi.`;

    if (!visibleRecords.length) {
      elements.tableBody.innerHTML = `
        <tr>
          <td class="empty-state" colspan="8">
            <strong>Data tidak ditemukan</strong>
            <span>Ubah kata kunci pencarian atau tambahkan data absensi baru.</span>
          </td>
        </tr>
      `;
    } else {
      elements.tableBody.innerHTML = visibleRecords.map(renderRow).join("");
    }

    renderPagination(filteredRecords.length, totalPages, startIndex, visibleRecords.length);
    renderStats();
  }

  function getFilteredRecords() {
    return records
      .filter((record) => {
        if (!state.query) return true;
        return `${record.name} ${record.address} ${record.gender}`.toLowerCase().includes(state.query);
      })
      .sort((a, b) => compareRecords(a, b));
  }

  function compareRecords(a, b) {
    const direction = state.sortDirection === "asc" ? 1 : -1;
    const valueA = getSortValue(a, state.sortField);
    const valueB = getSortValue(b, state.sortField);

    if (typeof valueA === "number" && typeof valueB === "number") {
      return (valueA - valueB) * direction;
    }

    return String(valueA).localeCompare(String(valueB), "id-ID") * direction;
  }

  function getSortValue(record, key) {
    if (key === "date") return `${record.date} ${record.timeIn}`;
    if (key === "name") return record.name;
    if (key === "gender") return record.gender;
    if (key === "timeIn") return timeToMinutes(record.timeIn);
    if (key === "timeOut") return timeToMinutes(record.timeOut);
    return record[key] || "";
  }

  function renderRow(record) {
    const genderClass = record.gender === "Perempuan" ? "female" : "";
    return `
      <tr>
        <td><strong>${escapeHtml(record.name)}</strong></td>
        <td>${escapeHtml(record.address)}</td>
        <td><span class="badge ${genderClass}">${escapeHtml(record.gender)}</span></td>
        <td>${formatDate(record.date)}</td>
        <td>${record.timeIn}</td>
        <td>${record.timeOut}</td>
        <td>${formatDuration(getDurationMinutes(record.timeIn, record.timeOut))}</td>
        <td class="action-column">
          <div class="actions">
            <button class="icon-btn edit" type="button" title="Update data" aria-label="Update data ${escapeHtml(record.name)}" data-action="edit" data-id="${record.id}">U</button>
            <button class="icon-btn danger" type="button" title="Delete data" aria-label="Delete data ${escapeHtml(record.name)}" data-action="delete" data-id="${record.id}">X</button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderPagination(totalItems, totalPages, startIndex, visibleCount) {
    const endIndex = visibleCount ? startIndex + visibleCount : 0;
    const startLabel = visibleCount ? startIndex + 1 : 0;
    elements.paginationInfo.textContent = `Menampilkan ${startLabel}-${endIndex} dari ${totalItems} data.`;

    const buttons = [
      paginationButton("Prev", Math.max(1, state.currentPage - 1), state.currentPage === 1)
    ];

    for (let page = 1; page <= totalPages; page += 1) {
      buttons.push(paginationButton(String(page), page, false, page === state.currentPage));
    }

    buttons.push(paginationButton("Next", Math.min(totalPages, state.currentPage + 1), state.currentPage === totalPages));
    elements.pagination.innerHTML = buttons.join("");
  }

  function paginationButton(label, page, disabled, active) {
    return `
      <button class="page-button ${active ? "is-active" : ""}" type="button" data-page="${page}" ${disabled ? "disabled" : ""}>
        ${label}
      </button>
    `;
  }

  function updateSortButtons() {
    document.querySelectorAll("[data-sort]").forEach((button) => {
      const isActive = button.dataset.sort === state.sortField;
      button.classList.toggle("is-active", isActive);
      button.classList.toggle("asc", isActive && state.sortDirection === "asc");
      button.classList.toggle("desc", isActive && state.sortDirection === "desc");
    });
  }

  function syncControls() {
    elements.sortField.value = state.sortField;
    elements.sortDirection.value = state.sortDirection;
    elements.pageSize.value = String(state.pageSize);
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearErrors();

    const formData = {
      address: fields.address.value.trim(),
      date: fields.date.value,
      gender: fields.gender.value,
      name: fields.name.value.trim(),
      timeIn: fields.timeIn.value,
      timeOut: fields.timeOut.value
    };

    const errors = validateForm(formData);
    if (Object.keys(errors).length) {
      showErrors(errors);
      return;
    }

    if (fields.recordId.value) {
      records = records.map((record) => (record.id === fields.recordId.value ? { ...record, ...formData } : record));
      showToast("Data absensi berhasil diperbarui.");
    } else {
      records.unshift({
        id: createId(),
        ...formData
      });
      showToast("Data absensi berhasil ditambahkan.");
    }

    saveRecords();
    resetForm();
    showView("list");
    render();
  }

  function validateForm(formData) {
    const errors = {};

    if (!formData.name) errors.name = "Nama wajib diisi.";
    if (!formData.address) errors.address = "Alamat wajib diisi.";
    if (!formData.gender) errors.gender = "Jenis kelamin wajib dipilih.";
    if (!formData.date) errors.date = "Tanggal absen wajib diisi.";
    if (!formData.timeIn) errors.timeIn = "Jam masuk wajib diisi.";
    if (!formData.timeOut) errors.timeOut = "Jam keluar wajib diisi.";

    if (formData.timeIn && formData.timeOut && timeToMinutes(formData.timeOut) <= timeToMinutes(formData.timeIn)) {
      errors.timeOut = "Jam keluar harus lebih besar dari jam masuk.";
    }

    return errors;
  }

  function showErrors(errors) {
    Object.entries(errors).forEach(([fieldName, message]) => {
      const field = fields[fieldName];
      const wrapper = field.closest(".form-field");
      const errorText = document.querySelector(`[data-error-for="${fieldName}"]`);
      wrapper.classList.add("has-error");
      errorText.textContent = message;
    });
  }

  function clearErrors() {
    document.querySelectorAll(".form-field").forEach((field) => field.classList.remove("has-error"));
    document.querySelectorAll("[data-error-for]").forEach((error) => {
      error.textContent = "";
    });
  }

  function openCreateForm() {
    resetForm();
    showView("form");
  }

  function openEditForm(record) {
    clearErrors();
    fields.recordId.value = record.id;
    fields.name.value = record.name;
    fields.address.value = record.address;
    fields.gender.value = record.gender;
    fields.date.value = record.date;
    fields.timeIn.value = record.timeIn;
    fields.timeOut.value = record.timeOut;
    elements.formTitle.textContent = "Update Data Absensi";
    elements.submitButton.innerHTML = '<span aria-hidden="true">OK</span> Update Absensi';
    showView("form");
  }

  function resetForm() {
    elements.attendanceForm.reset();
    clearErrors();
    fields.recordId.value = "";
    fields.date.value = toDateInputValue(new Date());
    elements.formTitle.textContent = "Input Data Absensi";
    elements.submitButton.innerHTML = '<span aria-hidden="true">OK</span> Simpan Absensi';
  }

  function showView(viewName) {
    elements.views.forEach((view) => {
      view.classList.toggle("is-active", view.dataset.view === viewName);
    });

    elements.viewLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.viewLink === viewName);
    });

    elements.breadcrumbCurrent.textContent = viewName === "form" ? "Input Absensi" : "Data Absensi";
    elements.sidebar.classList.remove("is-open");
  }

  function deleteSelectedRecord() {
    if (!state.deleteId) return;

    records = records.filter((record) => record.id !== state.deleteId);
    saveRecords();
    state.deleteId = null;
    closeDeleteModal();
    render();
    showToast("Data absensi berhasil dihapus.");
  }

  function closeDeleteModal() {
    state.deleteId = null;
    elements.deleteModal.classList.add("is-hidden");
  }

  function getDurationMinutes(timeIn, timeOut) {
    return Math.max(0, timeToMinutes(timeOut) - timeToMinutes(timeIn));
  }

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}j ${minutes}m`;
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(`${value}T00:00:00`));
  }

  function toDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `att-${Date.now().toString(36)}`;
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 2800);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();

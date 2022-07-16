class VehicleRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS vehicles (
              primaryKey INTEGER PRIMARY KEY AUTOINCREMENT,
              id TEXT,
              name TEXT,
              type TEXT,
              created INTEGER,
              lastSuccessfulConnection TEXT,
              long INTEGER,
              lat INTEGER
        )`;

        return this.dao.run(sql);
    }

    add(vehicle) {
        return this.dao.run(
            'INSERT INTO vehicles(id, name, type, created, lastSuccessfulConnection, long, lat) VALUES (?, ?, ?, ? ,?, ?, ?)',
            [vehicle.id, vehicle.name, vehicle.type, vehicle.created, vehicle.lastSuccessfulConnection, vehicle.location.long, vehicle.location.lat]
        )
    }

    getAll() {
        return this.dao.all('SELECT id, name, type, created, lastSuccessfulConnection, long, lat FROM vehicles');
    }

    getById(id) {
        return this.dao.get('SELECT id, name, type, created, lastSuccessfulConnection, long, lat FROM vehicles WHERE id = ?', [id]);
    }

    deleteById(id) {
        return this.dao.run('DELETE FROM vehicles WHERE id = ?', [id]);
    }

    update(vehicle) {
        return this.dao.run(
            'UPDATE vehicles SET name = ?, type = ?, created = ?, lastSuccessfulConnection = ?, long = ?, lat = ? WHERE id = ?',
            [vehicle.name, vehicle.type, vehicle.created, vehicle.lastSuccessfulConnection, vehicle.location.long, vehicle.location.lat, vehicle.id]
        )
    }
}
module.exports = VehicleRepository;

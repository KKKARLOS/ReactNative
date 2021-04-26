//countryController.js
const Country = require("../models/countryModel");

exports.getAllCountries = async (req, res) => {
	//console.log("Entra en getAllCountries");
	await Country.find({}, (err, countries) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!countries) return res.status(404).send({ message: `No existen paises` });
		res.status(200).send({ countries: countries });
	});
};

exports.getCountryById = async (req, res) => {
	let countryId = req.params.id;

	await Country.findOne({ _id: countryId }, (err, country) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!country) return res.status(404).send({ message: `No existe ese país` });
		res.send({ country: country });
	});
};

exports.insertCountry = async (req, res) => {
	//console.log(req.body);
	let country = new Country();
	country.name = req.body.name;

	await country.save((err, countryStored) => {
		if (err) res.status(500).send({ message: `Error al guardar en base de datos ${err}` });
		res.status(200).send({ country: countryStored });
	});
};

exports.updateCountry = async (req, res) => {
	let countryId = req.params.id;
	let update = req.body;

	await Country.findByIdAndUpdate(countryId, update, { new: true }, (err, countryUpdate) => {
		if (err) res.status(500).send({ message: `Error al actualizar en base de datos ${err}` });
		if (!countryUpdate) res.status(404).send({ message: `El país: ${countryId} no existe` });
		res.status(200).send({ country: countryUpdate });
	});
};

exports.deleteCountry = async (req, res) => {
	let countryId = req.params.id;

	await Country.findByIdAndRemove(countryId, (err, countryDelete) => {
		if (err) res.status(500).send({ message: `Error al borrar en base de datos ${err}` });
		if (!countryDelete) res.status(404).send({ message: `El país : ${countryId} no existe` });
		else res.status(200).send({ message: "El país ha sido eliminado" });
	});
};

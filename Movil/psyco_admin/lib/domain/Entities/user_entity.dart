class Therapist {
  final String registerDate;
  final String names;
  final String genre;
  final String birthDate;
  final String age;
  final String email;
  final String password;
  final String phone;
  final String address;
  final String typeDocument;
  final String documentNumber;
  final String status;

  Therapist(
      {this.registerDate = "",
      this.names = "",
      this.genre = "",
      this.birthDate = "",
      this.age = "",
      required this.email,
      required this.password,
      this.phone = "",
      this.address = "",
      this.typeDocument = "",
      this.documentNumber = "",
      this.status = ""});
}

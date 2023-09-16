FROM mcr.microsoft.com/dotnet/aspnet:6.0

LABEL version="1.0.2" description="Web API .NET 6 Cabeleleila"

WORKDIR /source

# Copiar os projetos e restaurá-los
COPY *.sln .
COPY global.json .
COPY Cabeleleila.WebAPI/*.csproj ./Cabeleleila.WebAPI/
COPY Cabeleleila.Repository/*.csproj ./Cabeleleila.Repository/
COPY Cabeleleila.Domain/*.csproj ./Cabeleleila.Domain/
RUN dotnet restore

# Migrações
RUN dotnet ef database update --project Cabeleleila.Repository --startup-project Cabeleleila.WebAPI --verbose

# Copiar todo o restante
COPY Cabeleleila.WebAPI/. ./Cabeleleila.WebAPI/
COPY Cabeleleila.Repository/. ./Cabeleleila.Repository/
COPY Cabeleleila.Domain/. ./Cabeleleila.Domain/

# Rodar
RUN dotnet publish Cabeleleila.Web/Cabeleleila.Web.csproj -c release -o /app

WORKDIR /app
EXPOSE 80/tcp
ENTRYPOINT ["dotnet", "Cabeleleila.WebAPI.dll"]
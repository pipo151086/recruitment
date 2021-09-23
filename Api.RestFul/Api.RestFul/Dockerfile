#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Api.RestFul/Api.RestFul.csproj", "Api.RestFul/"]
RUN dotnet restore "Api.RestFul/Api.RestFul.csproj"
COPY . .
WORKDIR "/src/Api.RestFul"
RUN dotnet build "Api.RestFul.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api.RestFul.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.RestFul.dll"]
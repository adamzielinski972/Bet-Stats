# Use .NET 8.0 SDK for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["BetStats.sln", "./"]
COPY ["BetStats.Api.csproj", "./"]
RUN dotnet restore BetStats.sln

# Copy the rest of the code
COPY . .

# Build the application
RUN dotnet publish BetStats.Api.csproj -c Release -o /app

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Expose port 5000
EXPOSE 5000

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000

# Start the application
ENTRYPOINT ["dotnet", "BetStats.Api.dll"] 